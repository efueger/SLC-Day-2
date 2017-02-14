const request = require('request');
const cheerio = require('cheerio');
const readLine = require('readline');
const colors = require('colors');
const Table = require('cli-table');


let defaultUrl = 'http://www.imdb.com/title/tt3521164/';

const rl = readLine.createInterface({ input: process.stdin, output: process.stdout });


console.log(colors.bgBlue('\n Enter an IMDB movie url below to fetch information '));
console.log(colors.blue('\nThe url look like this: http://www.imdb.com/title/tt3521164/'));
console.log(colors.blue('\t\t\t OR'));
console.log(colors.bgBlue.bold('Hit Enter to use default url \n'));


rl.question(colors.grey(' Enter an IMDB movie url: '), function (enteredUrl) {

  const url = enteredUrl || defaultUrl;

  request(url, function (error, response, html) {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      let title;
      let release;
      let rating;
      const json = { title: '', release: '', rating: '', poster: '', trailer: '' };

      $('.title_wrapper').filter(function () {
        const data = $(this);
        title = data.children().first().text();
        release = data.children().last().children().last().text();
        json.title = title;
        json.release = release;
      });

      $('.ratingValue').filter(function () {
        const data = $(this);
        rating = data.children().first().text();
        json.rating = rating;
      });

      $('.poster').filter(function () {
        const data = $('.poster a img');
        const poster = data.attr('src');
        json.poster = poster;
      });

      $('.slate').filter(function () {
        const data = $('.slate a img');
        const trailer = data.attr('src');
        json.trailer = trailer;
      });

      const table = new Table({
        head: [
          colors.yellow('Header'),
          colors.yellow('Info'),
        ],
        colWidths: [30, 60],
      });

      table.push([
        'Title ', json.title,
      ], [
        'Release Year ', json.release,
      ], [
        'Rating ', json.rating,
      ], [
        'Poster/Image URL ', json.poster,
      ]);

      console.log('\n\n');
      console.log(colors.bold.cyan('\t\t IMDB Movie Infomation for ' + json.title));
      console.log(colors.random('\t------------------------------------------------------------ \n'));
      console.log(colors.cyan(table.toString()));
      console.log('\n');
    }
  });

  rl.close();
});
