require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

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

app.get('/api/restaurant', (req, res, next) => {
  const sql = `
    select *
      from "tables"
  `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
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

app.post('/api/orders/', (req, res, next) => {
  if (!checkValidity(req.body.tableId) || req.body.items.length === 0) {
    return res.status(400).json({ error: 'Sorry, your order information is incomplete.' });
  }

  const paramDb = [parseInt(req.body.tableId), 'NOW()'];
  const sql = `
      insert into "orders" ("tableId", "orderedAt")
          values ($1, $2)
        returning *
    `;

  db.query(sql, paramDb)
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
    })
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => next(err));
});

app.get('/api/waitlist', (req, res, next) => {
  const sql = `select * from "waitLists"
  order by  "isSeated" asc, "time" asc;`;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/checks/:checkId', (req, res, next) => {
  const { checkId } = req.params;
  const sql = `
  select "m".* from "checks" as "c"
  join "checkOrders" as "co" on "co"."checkId" = "c"."checkId"
  join "orders" as "o" on "o"."orderId" = "co"."orderId"
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
  const sql = `insert into "waitLists" ("name", "partySize", "comment", "time")
    values($1, $2, $3, now())
    returning *`;
  const params = [req.body.name, partySize, comment];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows[0]);
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
