require('dotenv/config');
const express = require('express');
const multer = require('multer');
const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const headersMiddleware = require('./headers-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

function checkValidity(num) {
  const intNum = parseInt(num);
  if (isNaN(intNum) || intNum < 0) {
    return false;
  } else {
    return true;
  }
}

function getDbParam(orderId, items) {
  const paramDb = [];
  const order = [];
  const item = [];
  const quantity = [];
  const discount = [];
  const time = [];

  items.forEach(element => {
    order.push(orderId);
    item.push(element[0]);
    quantity.push(element[1]);
    discount.push(0);
    time.push('NOW()');
  });

  paramDb.push(order, item, quantity, discount, time);
  return paramDb;
}

app.use('/api', headersMiddleware);

app.get('/api/restaurant', (req, res, next) => {
  const sql = `
  with "openChecks" as (
    select "c"."tableId", "c"."isPaid"
    from "checks" as "c"
    order by "c"."createdAt" desc

  )
  select distinct on ("t"."tableId") "t".*,
      coalesce("oc"."isPaid", false) and "t"."tableStatus" = 2 as "isClosed"
      from "tables" as "t"
      left join "openChecks" as "oc" using ("tableId")

      order by "tableId"

  `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(error => {
      next(error);
    });
});

app.put('/api/restaurant/:tableId', (req, res, next) => {
  const tableId = parseInt(req.params.tableId);
  if (!tableId) {
    next(new ClientError('invalid tableId', 400));
    return;
  }
  const newStatus = parseInt(req.body.newStatus, 10);
  if (isNaN(newStatus) || newStatus > 2) {
    next(new ClientError('newStatus is invalid', 400));
    return;
  }
  let sql;
  let params;
  if (newStatus === 1) {
    sql = `
  update "tables"
  set "tableStatus" =$1,
    "timeSeated" = $2
  where "tableId" = $3
  returning *
  `;
    params = [newStatus, 'NOW()', tableId];
  }
  if (newStatus === 0) {
    sql = `
  update "tables"
  set "tableStatus" =$1,
    "timeSeated" = $2
  where "tableId" = $3
  returning *
  `;
    params = [newStatus, null, tableId];
  }
  if (newStatus === 2) {
    sql = `
    update "tables"
    set "tableStatus" = $1
    where "tableId" = $2
    returning *
  `;
    params = [newStatus, tableId];
  }

  db.query(sql, params)
    .then(response => {
      const updated = response.rows[0];
      if (!updated) {
        next(new ClientError('table is not found', 404));
        return;
      }
      res.status(200).json(updated);
    })
    .catch(error => {
      next(error);
    });
});

app.get('/api/menus', (req, res, next) => {
  const sql = `
    select *
      from "menus"
  `;

  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/menus', upload.single('image'), (req, res) => {
  const item = req.body.item;
  let cost = req.body.cost;
  let salePrice = req.body.salePrice;

  if (!item || !cost || !salePrice) {
    return res.status(400).json({
      error: 'Sorry, missing information. Check input data again.'
    });
  }

  cost = parseFloat(cost).toFixed(2);
  salePrice = parseFloat(salePrice).toFixed(2);
  const url = req.file ? '/images/' + req.file.filename : null;
  const paramDb = [item, cost, salePrice, url];
  const sql = `
      insert into "menus" ("item", "cost", "salePrice", "imageUrl")
           values ($1, $2, $3, $4)
        returning *
    `;

  db.query(sql, paramDb)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(() => res.status(500).json({
      error: 'An unexpected error occured.'
    }));
});

app.put('/api/menus/:itemId', upload.single('image'), (req, res, next) => {
  const itemId = req.params.itemId;
  const item = req.body.item;
  let cost = req.body.cost;
  let salePrice = req.body.salePrice;

  if (!checkValidity(itemId) || !item || !cost || !salePrice) {
    return res.status(400).json({
      error: 'Sorry, your requested information is invalid.'
    });
  }

  cost = parseFloat(cost).toFixed(2);
  salePrice = parseFloat(salePrice).toFixed(2);
  const url = req.file ? '/images/' + req.file.filename : null;
  const paramDb = [item, cost, salePrice, url, itemId];
  const sql = `
    update "menus"
       set "item" = $1,
           "cost" = $2,
           "salePrice" = $3,
           "imageUrl" = $4
     where "itemId" = $5
           returning *
   `;

  db.query(sql, paramDb)
    .then(result => {
      if (result.rows[0] === undefined) {
        return res.status(400).json({
          error: 'Requested itemId may not exist in the database. Check your data agin.'
        });
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.delete('/api/menus/:itemId', (req, res, next) => {
  if (!checkValidity(req.params.itemId)) {
    return res.status(400).json({
      error: 'Sorry, your requested id is invalid.'
    });
  }
  const itemId = parseInt(req.params.itemId);
  const paramDb = [itemId];
  const sql = `
    delete from "menus"
          where "itemId" = $1
      returning *
  `;

  db.query(sql, paramDb)
    .then(result => {
      if (result.rows[0] === undefined) {
        return res.status(400).json({
          error: `Requested itemId may not exist in the database.
            Check your data agin.`
        });
      } else {
        res.status(204).end();
      }
    })
    .catch(err => next(err));
});

app.get('/api/orders', (req, res, next) => {
  const sql = `
    select "o"."tableId",
          "o"."orderId",
          (extract(epoch from now() - "o"."orderedAt") / 60)::integer as "elapsedMinutes",
    array_agg(jsonb_build_object(
      'orderItemId', "oi"."orderItemId",
      'item', "m"."item",
      'quantity', "oi"."quantity",
      'isCompleted', "oi"."isCompleted"
    )) as "items"
    from "orders" as "o"
    join "orderItems" as "oi" using ("orderId")
    join "menus" as "m" using ("itemId")
    where "o"."isSent" = false
    group by "o"."tableId", "o"."orderId", "o"."orderedAt"
    order by "o"."orderedAt" desc;
  `;

  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/orders/:tableId', (req, res, next) => {
  if (!checkValidity(req.params.tableId)) {
    return res.status(400).json({
      error: 'Sorry, your requested id is invalid.'
    });
  }
  const tableId = parseInt(req.params.tableId);
  const paramDb = [tableId];
  const sql = `
    select "timeSeated"
    from "tables"
    where "tables"."tableId" = $1
  `;
  db.query(sql, paramDb)
    .then(result => {
      if (result.rows[0] === undefined) {
        throw new ClientError('Sorry, requested tableId may not exist now.', 400);
      } else if (result.rows[0].timeSeated === null) {
        throw new ClientError('Sorry, table is empty.', 400);
      } else {
        const timeSeated = result.rows[0].timeSeated;
        const sql = `
          select "orderedAt"
          from "orders"
          where "orders"."tableId" = $1
          order by "orders"."orderedAt" desc
          limit 1
        `;

        return db.query(sql, paramDb)
          .then(result2 => {
            if (result2.rows[0] === undefined) {
              return res.status(200).json({});
            } else {
              const orderedAt = result2.rows[0].orderedAt;
              return { timeSeated, orderedAt };
            }
          })
          .catch(err => next(err));
      }
    })
    .then(result => {
      if (result.timeSeated >= result.orderedAt || result === undefined) {
        return res.status(200).json({});
      }

      const paramDb = [parseInt(req.params.tableId)];
      const sql = `
          select "o"."orderId",
            "o"."orderedAt",
          array_agg(jsonb_build_object(
            'item', "m"."item",
            'quantity', "oi"."quantity",
            'salePrice', "m"."salePrice"
          )) as "items"
          from "orders" as "o"
          join "orderItems" as "oi" using ("orderId")
          join "menus" as "m" using ("itemId")
          where "o"."tableId" = $1
          group by "o"."orderId", "o"."orderedAt"
          order by "o"."orderedAt" desc
          limit 1;
      `;

      db.query(sql, paramDb)
        .then(result => {
          res.status(200).json(result.rows[0]);
        });
    })
    .catch(err => next(err));
});

function getCheckId(db, tableId) {
  const selectCheckIdSql = `
    select "checkId" from "checks"
      where "tableId" = $1
      and   "isPaid" = false
            limit 1
  `;
  const selectCheckIdParams = [tableId];
  const insertCheckSql = `
    insert into "checks" ("tableId", "createdAt")
      values ($1, now())
    returning "checkId"
  `;
  const insertCheckIdParams = [tableId];
  return db.query(selectCheckIdSql, selectCheckIdParams)
    .then(result => {
      if (result.rows.length === 0) {
        return db.query(insertCheckSql, insertCheckIdParams)
          .then(result => {
            return result.rows[0].checkId;
          });
      } else {
        return result.rows[0].checkId;
      }
    });
}

app.post('/api/orders/', (req, res, next) => {
  if (!checkValidity(req.body.tableId) || req.body.items.length === 0) {
    return res.status(400).json({
      error: 'Sorry, your order information is incomplete.'
    });
  }
  getCheckId(db, req.body.tableId)
    .then(checkId => {
      const paramDb = [parseInt(req.body.tableId), 'NOW()', checkId];
      const sql = `
      insert into "orders" ("tableId", "orderedAt", "checkId")
          values ($1, $2, $3)
        returning *
    `;

      return db.query(sql, paramDb)
        .then(result => {
          const orderId = result.rows[0].orderId;
          const paramDb = getDbParam(orderId, req.body.items);
          const sql = `
        insert into "orderItems" ("orderId", "itemId", "quantity", "discount", "createdAt")
        select * from UNNEST ($1::int[], $2::int[], $3::int[], $4::int[], $5::timestamp[])
        returning "orderItemId"
      `;

          return db.query(sql, paramDb)
            .then(result2 => {
              const orderItemIds = result2.rows;

              return { orderId, orderItemIds };

            });
        });

    })
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => next(err));

});

app.patch('/api/orders/:orderId', (req, res, next) => {
  if (!checkValidity(req.params.orderId)) {
    return res.status(400).json({ error: 'Sorry, your requested id is invalid.' });
  }

  const orderId = parseInt(req.params.orderId);
  const isSent = req.body.isSent;
  const paramDb = [orderId, isSent];
  const sql = `
      update "orders"
      set "isSent" = $2
      where "orderId" = $1
      returning *
  `;

  db.query(sql, paramDb)
    .then(result => {
      if (result.rows[0] === undefined) {
        return res.status(404).json({
          error: 'Requested id may not exist in the database. Check your data agin.'
        });
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.patch('/api/orderItems/:orderItemId', (req, res, next) => {
  if (!checkValidity(req.params.orderItemId)) {
    return res.status(400).json({
      error: 'Sorry, your requested id is invalid.'
    });
  }

  const orderItemId = parseInt(req.params.orderItemId);
  const isCompleted = req.body.isCompleted;
  const paramDb = [orderItemId, isCompleted];
  const sql = `
      update "orderItems"
      set "isCompleted" = $2
      where "orderItemId" = $1
      returning *
  `;

  db.query(sql, paramDb)
    .then(result => {
      if (result.rows[0] === undefined) {
        return res.status(404).json({
          error: 'Requested id may not exist in the database. Check your data agin.'
        });
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => next(err));

});

app.delete('/api/orderItems/:orderItemId', (req, res, next) => {
  if (!checkValidity(req.params.orderItemId)) {
    return res.status(400).json({
      error: 'Sorry, your requested id is invalid.'
    });
  }
  const orderItemId = parseInt(req.params.orderItemId);
  const paramDb = [orderItemId];
  const sql = `
    delete from "orderItems"
    where "orderItemId" = $1
    returning *
  `;

  db.query(sql, paramDb)
    .then(result => {
      if (result.rows[0] === undefined) {
        return res.status(400).json({
          error: 'Requested id may not exist in the database. Check your data agin.'
        });
      } else {
        res.status(204).end();
      }
    })
    .catch(err => next(err));
});

app.get('/api/sales', (req, res, next) => {
  const sql = `
      select "menus"."item" as "Item Name",
        "menus"."imageUrl" as "Image",
        sum("orderItems"."quantity") as "Total Sold",
        "menus"."salePrice" as "Sale Price",
        "menus"."cost" as "Cost",
        ("menus"."salePrice" - "menus"."cost") * sum("orderItems"."quantity") as "Profit"
      from "menus"
      join "orderItems" using ("itemId")
      group by ("menus"."item", "menus"."imageUrl", "menus"."salePrice", "menus"."cost")
      order by "Profit" desc;
    `;

  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/checks', (req, res, next) => {
  const sql = `
    select * from "checks"
    where "isPaid" = false
    `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(error => {
      next(error);
    });
});

app.get('/api/checks/:checkId', (req, res, next) => {
  const { checkId } = req.params;

  const sql = `
  select "m".*, "c"."taxRate", "oi"."quantity"
  from "checks" as "c"
  join "orders" as "o" using ("checkId")
  join "orderItems" as "oi" on "oi"."orderId" = "o"."orderId"
  join "menus" as "m" on "m"."itemId" = "oi"."itemId"
  where "c"."checkId" = $1;
  `;
  const params = [checkId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.put('/api/checks/:checkId', (req, res, next) => {
  const { checkId } = req.params;
  const { tip } = req.body;
  const sql = `
  update "checks"
  set "isPaid" = true, "tip" = $1
  where "checkId" = $2
  returning "tableId"
  `;

  const params = [tip, checkId];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length > 0) {
        const tableId = result.rows[0].tableId;
        const sqlTwo = `
        update "tables"
        set "tableStatus" = 2
        where "tableId" = $1
        `;
        const paramsTwo = [tableId];
        return db.query(sqlTwo, paramsTwo)
          .then(result => {
            res.status(200).json('update table status success');
          });

      }

    })
    .catch(error => next(error));
});

app.get('/api/waitlist', (req, res, next) => {
  const sql = `
       select "w"."waitId",
              "w"."name",
              "w"."partySize",
              concat(extract(hour from (CURRENT_TIME  - "w"."time"::time)), ':', extract(minute from (CURRENT_TIME  - "w"."time"::time))) as "time",
              "w"."comment",
              "w"."isSeated"
         from "waitLists" as "w"
    order by  "isSeated" asc, "time" asc;
    `;

  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/waitlist', (req, res, next) => {
  const partySize = parseInt(req.body.partySize, 10);
  if (!partySize || !req.body.name) {
    next(new ClientError('missing partySize or name', 400));
  }
  let comment;
  if (req.body.comment) {
    comment = req.body.comment;
  } else {
    comment = null;
  }
  const sql = `
    insert into "waitLists" ("name", "partySize", "comment", "time")
    values($1, $2, $3, now())
    returning *`;
  const params = [req.body.name, partySize, comment];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.patch('/api/waitlist/:waitId', (req, res, next) => {
  const waitId = parseInt(req.params.waitId, 10);
  const isSeated = req.body.isSeated;
  if (!waitId) {
    next(new ClientError('waitId is invalid: not a number', 400));
    return;
  }
  if (isSeated === undefined) {
    next(new ClientError('must supply current isSeated', 400));
    return;
  }
  const sql = `
    update "waitLists"
    set "isSeated" = $2
    where "waitId" = $1
    returning *
    `;
  const params = [waitId, !isSeated];
  db.query(sql, params)
    .then(result => {
      const updated = result.rows[0];
      if (!updated) {
        next(new ClientError('waitId is invalid: number not in DB', 404));
        return;
      }
      res.status(200).json(updated);
    })
    .catch(err => next(err));
});

app.put('/api/waitlist/:waitId', (req, res, next) => {
  const waitId = parseInt(req.params.waitId, 10);
  if (!waitId) {
    next(new ClientError('waitId is invalid: not an integer', 400));
    return;
  }
  const partySize = parseInt(req.body.partySize, 10);
  if (!partySize) {
    next(new ClientError('partySize is invalid', 400));
    return;
  }
  const { name } = req.body;
  if (!name) {
    next(new ClientError('no name supplied', 400));
    return;
  }
  let { comment } = req.body;
  if (!comment) {
    comment = null;
  }
  const sql = `
    update "waitLists"
    set "name" = $1,
    "partySize" = $2,
    "comment" = $3
    where "waitId" = $4
    returning *
  `;
  const params = [name, partySize, comment, waitId];
  db.query(sql, params)
    .then(result => {
      const updated = result.rows[0];
      if (!updated) {
        next(new ClientError('waitId is invalid: number not in DB', 404));
        next(new ClientError(`No customer with waitId ${waitId}`, 404));
        return;
      }
      res.status(200).json(updated);
    })
    .catch(err => next(err));
});

app.delete('/api/waitlist/:waitId', (req, res, next) => {
  const waitId = parseInt(req.params.waitId, 10);
  if (!waitId) {
    res.status(400).json({
      error: 'invalid waitId: not an integer'
    });
    return;
  }
  const sql = `
    delete from "waitLists"
    where "waitId" = $1
    returning *
  `;
  const params = [waitId];
  db.query(sql, params)
    .then(result => {
      const deleted = result.rows[0];
      if (!deleted) {
        next(new ClientError('that ID does not exist', 404));
        return;
      }
      res.sendStatus(204);
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
