module.exports = (ctx) => {
  const {app} = ctx;

  app.get('/transactions', (req, res) => {
    res.json({ name: "josiah", });
  })

  .post('/transactions', (req, res) => {
    res.json({name: "responded"});
  })

  .patch('/transactions', (req, res) => {
    res.json({name: "patched"});
  })

  .delete('/transactions', (req, res) => {
    res.json({name: "deleted"});
  });
};
