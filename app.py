from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/charts')
def charts():
    return render_template('charts.html')

@app.route('/tables')
def tables():
    return render_template('tables.html')

if __name__ == '__main__':
    app.run(debug=True)
