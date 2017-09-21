# The Scraper TImes
A new-scraping app built around Cheerio, MongoDB, and Bootstrap.

# Usage
On load, the site will display a list of scraped articles from the New York Times and display them for the user. Users can opt to "save" articles, which will move them to the saved section of the page. 

# Scrape
Users can press the scrape button at any time which causes the backend to scrape from the New York Times world news section and pull down the latest headlines. All displayed headlines can be read by clicking the headline.

# Saved Articles
In the Saved Articles section, users can comment on Saved articles or delete saved articles. By deleting saved articles all comments too are deleted from the db.

# Technology Used
The Scraper Times was built using:
- Express
- MongoDB
- Mongoose
- Bootstrap
