const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/home', async (req, res) => {
  const results = [];
  const caregory = ['waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink', 'poke', 'dance', 'cringe'];
  for (let i = 0; i < 15; i++) {
    await fetch(`https://api.waifu.pics/sfw/${caregory[i]}`).then((getData) =>{
      return getData.json();
    }).then((data)=> {
      results.push(data);
    });
  }
  res.send(results);
});


router.post('/api', (req, res)=>{
  const SearchApi = `https://api.jikan.moe/v3/search/${req.body.category}?q=${req.body.inpt_search}&type=${req.body.typeSerch}&page=${req.body.page}`;
  fetch(SearchApi).then((getData)=>{
    return getData.json();
  }).then((data)=>{
    res.json({
      inpt_search: req.body.inpt_search,
      category: req.body.category,
      typeSerch: req.body.typeSerch,
      page: req.body.page,
      data: data,
    });
  });
});


module.exports = router;
