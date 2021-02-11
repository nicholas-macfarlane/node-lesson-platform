# node-lesson-platform

## caveats
*For expediency's sake, this project is one server - ideally it would be comprised of a front-end server that requests data and authentication from this one, and serves templates to clients using that data, as this is a solid seperation of concerns (client vs api), and makes maintenance of both sides easier.

This is a node server with auth,db,and templating. There's not much in the UX department at this time, and I've tried to make note some of the more obvious next-steps, but overall I've focused more on the backend processes and haven't addressed a nice-looking UI, i.e. bootstrap/etc vue/react/etc.

## technology stack:
Node.JS,
Express,
Sequelize(Persistence library),
Handlebars(Templating Library),
Populate (utility function I wrote to come up with random and often amusing db data),
Postgresql(with DB named platform),
Auth0(for user authentication)

## setup
0. Assumes: Basic knowledge of command line/terminal, npm, node, linux, sql, and/or git.

A local, empty postgresql database named 'platform'. pgsql/createDB.pgsql contains syntax for creating the database, if one does not exist. Variables can be configured in the ".env template" file.
 
This needs to be renamed to .env after you've confirmed you have the correct info filled in for your db connection. The cert and key files used for testing have been included, along with the Auth0 credentials for testing.


1. Clone/unzip repository into new project directory.
2. From the terminal, browse to the new project directory and run "npm install".
3. After dependencies are installed, fill in the db connection information in .env
4. Run "npx sequelize-cli db:migrate" from the terminal to create the users and lesson tables in the database.
5. Run "npm run dev" to launch the server. This uses nodemon, so the server will auto-reload as changes are saved to the code.
6. Browse to https://localhost:3000/populate to insert sample data into the database. This route is unsecured and intended to simplify testing only, do not leave this active in a production environment!
7. Browse to https://localhost:3000/login to authorize with Auth0 and you will be redirected to the list of available lessons on success.

## behavior
All http requests are routed to fixed https endpoints: login screen if unauthenticated, or lessons view if logged in. Note that login screen is generic Auth0 login, not customized at this time.

New users and their email addresses are added to the database upon login. A record of all lesson ids completed by users is kept, allowing for basic leaderboards and progress tracking.

Lessons and users can be generated(+100 of each per hit) by browsing to the :3000/populate endpoint.

Current user data is derived from the user's authorization data, users are addressed by emails. Note that no usernames/custom cookies are implemented at this time.

From the listing of all lessons, and lesson can be clicked on to go to a page specific to the lesson.

The leaderboard shows the top 10 users by number of lessons completed, note that no User route has been implemented at this time. 

Lesson completion is tracked in an array of completed lesson ids in the user's db record. Currently this is only updated by populate/direct queries, module completion within the site is not implemented at this time.

Sequelize was chosen as a promising candidate to save some development time, as was Auth0. I believe they've served their purposes well, but I haven't dug into them deep enough to know whether I'd use them in a production project or swap them out for similar tools.
