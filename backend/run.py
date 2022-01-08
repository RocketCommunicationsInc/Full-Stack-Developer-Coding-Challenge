from api import app, db
import os


@app.shell_context_processor
def make_shell_context():
    return {
      "app": app,
      "db": db
      }


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=os.environ.get('PORT', 80))