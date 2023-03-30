# make sure you are in the backend folder in cmd
# create myenv or enter existing one (to enter existing one, skip to activate step)
# python -m venv myenv
# install all packages
# pip install -r requirements.txt
# activate
# .\myenv\Scripts\activate
# flask run --port=8000
# http://localhost:8000/userdata to see data

from flask import Flask, jsonify, request
import project

app = Flask(__name__)
projectDb = []


@app.route('/test', methods=['GET', 'POST'])
def test():
    return jsonify({'message': 'It works!'})


if __name__ == '__main__':
    app.run(port=8000, debug=True)
