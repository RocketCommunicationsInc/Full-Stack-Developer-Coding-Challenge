# Lessons Learned

1. Flask, SQLAlchemy, Flask-restful
    - Flask in general (microfreamework, basic app structure)
    - SQLAlchemy and it being a SQL Toolkit (like knex for node)
    - Flask-restful in gerneal, using Resources to add CRUD methods and Api to create the endpoint.

2. Being careful with SQLAlchemy's db.create_all()
    - Forgot to comment/remove the db.create_all() when I first deployed to heroku, so I was doubling all the info in the DB.

3. Marshaling and JSON responses
    - marshal_with() decorator takes in raw data and dict of fields to change the data based on those fields. This is especially helpful when trying to take in data that might not be in a JSON format. 
    - Used marshal_with() in this project to ensure data looked the way I wanted.
    -  With my '/register' and '/login' endpoints being POST reqs, the marshal_with() was messing with the response. I would get the 200 success, but the response was always an empty copy of the fields I had created to marshal with. This is because I was trying to return different things based on the given req, but marshal_with() was allowing for only one response: that of the fields given.

4. Deploying To Heroku (a reoccuring lesson)
    - I've deployed to heroku several times, but each time is something new. 
    - This time, Heroku could not find my BE path, since I had pushed the branch with separate folders for BE/FE. 
    - My solution was to create a designated BE branch where the BE was the root, push it, and use that branch to deploy. 

5. Python, PC, and Enviorment Issues
    - Installing things in pip but not pipenv was something that I did more often than I'd like to admit. 
    - Updating my PATH on my pc in order to use the correct version of python

6. AG Grid 
    - Great templates and built in themes, filtering and ordering. 



# Things I'd do Differently

1. Simplify things 
    - I hadn't used Flask before, so when I started googling and pulled up the docs/found guides, I immediatley over-complicated things. I was using a bunch of fluff. If I could go back, I would start at the most basic Flask app, and work my way up from there, instead of jumping into the deep end.

2. Time Management
    - This coincides with my over-complification. I spent a good chunck of time on my first Flask attempt, which I eventually trimmed down signifacantly. This put me behind, and I really wish I had more time to work on the FE.

3. FE Styling
    - I would have loved to spend most of my time with beautifying the front end. My react functionality came rather quickly, but because of my BE time I wasn't able to make things as nice as I'd like. Espeically the '/dash' route. 

4. AG Grid
   - When I found AG Grid I was really excited, and it made for a very fast and simple implementation of a responisve, filtering table. However, I would have liked to customize it much more, especially with some of the table displaying customized data.

5. Testing
   - There isn't very extensive testing in this project. Had I been better with my time, I would have done so.
  
6. Use more Astro UXDS components/styling.
    
7. Better Error Handling
    - Most of my error handling is simply printing the error message to the console. It would be much better to flush those out more.

8. Responsive Design
    - Would have ensured that FE is fully responsive.
  
9.  General Code Cleanup
    - This one I just forgot in the heat of things. 
    - Lots of comments or un-used imports, which is an easy fix, but leaving them in here just to be totally transparent.