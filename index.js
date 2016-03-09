var request = require("request");
var Slack = require('node-slack');
var fs =  require('fs');


var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));


var options = null;


var slack = new Slack(config.slack_webhook_url,options);


var interval = setInterval(function() {
  console.log('crawling');
  crawl();

}, config.period*1000);
//clearInterval(interval);

function crawl()
{
  for(var i in config.tested_domains)
  {
    var domain = config.tested_domains[i];

  request(domain, function(error, response, body) {

    console.log(error);
    if(error)
    {

      slack.send({
           text: 'Tarantula cannot access '+ domain + '!!'
           //,
           //  channel: '#tarantula',
           //  username: 'TarantulaBot'
         });


      console.log('Tarantule cannot access '+domain+'!')
    }



    });
  }
}
