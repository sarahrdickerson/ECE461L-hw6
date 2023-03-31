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

proj1 = project.Project('Project 1', 1)
proj1.addAuthUsers(['srd2729', 'cba9282', 'db392', 'mpa391'])
proj1.addHwSet(project.HwSet('HWSet 1', 100))
proj1.addHwSet(project.HwSet('HWSet 2', 50))
proj1.addHwSet(project.HwSet('HWSet 3', 25))
proj1.addHwSet(project.HwSet('HWSet 4', 10))
projectDb.append(proj1)

proj2 = project.Project('Project 2', 2)
proj2.addAuthUsers(['bds2342', 'dis2342', 'be323', 'mpo9382', 'dt432'])
proj2.addHwSet(project.HwSet('HWSet 1', 100))
proj2.addHwSet(project.HwSet('HWSet 2', 50))
proj2.addHwSet(project.HwSet('HWSet 3', 25))
proj2.addHwSet(project.HwSet('HWSet 4', 10))
projectDb.append(proj2)

proj3 = project.Project('Project 3', 3)
proj3.addAuthUsers(['dba123', 'ds342', 'mo436', 'pl583'])
proj3.addHwSet(project.HwSet('HWSet 1', 100))
proj3.addHwSet(project.HwSet('HWSet 2', 50))
proj3.addHwSet(project.HwSet('HWSet 3', 25))
proj3.addHwSet(project.HwSet('HWSet 4', 10))
projectDb.append(proj3)

proj4 = project.Project('Project 4', 4)
proj4.addAuthUsers(['srd2729'])
proj4.addHwSet(project.HwSet('HWSet 1', 100))
proj4.addHwSet(project.HwSet('HWSet 2', 50))
proj4.addHwSet(project.HwSet('HWSet 3', 25))
proj4.addHwSet(project.HwSet('HWSet 4', 10))
projectDb.append(proj4)


@app.route('/test', methods=['GET', 'POST'])
def test():
    return jsonify({'message': 'It works!'})


@app.route('/userdata', methods=['GET'])
def getUserData():
    return jsonify({'len': len(projectDb)})


@app.route('/api/checkin_hardware/<int:projectid>/<int:qty>', methods=['POST'])
def checkIn_hardware(projectid, qty):
    hwSetNum = int(request.args.get('hwSetNum'))
    foundProject = False
    for proj in projectDb:
        if proj.getProjectId() == projectid:
            foundProject = True
            if proj.getHwSets()[hwSetNum-1].checkIn(qty):
                return jsonify({'success': True, 'foundProject': foundProject, 'projectId': projectid, 'hwSetNum': hwSetNum, 'qty': qty})
    return jsonify({'success': False, 'foundProject': foundProject, 'projectId': projectid})


@app.route('/api/checkout_hardware/<int:projectid>/<int:qty>', methods=['POST'])
def checkOut_hardware(projectid, qty):
    hwSetNum = int(request.args.get('hwSetNum'))
    foundProject = False
    for proj in projectDb:
        if proj.getProjectId() == projectid:
            foundProject = True
            if proj.getHwSets()[hwSetNum-1].checkOut(qty):
                return jsonify({'success': True, 'foundProject': foundProject, 'projectId': projectid, 'hwSetNum': hwSetNum, 'qty': qty})
    return jsonify({'success': False, 'foundProject': foundProject, 'projectId': projectid})


@app.route('/api/joinProject/<int:projectid>', methods=['POST'])
def joinProject(projectid):
    foundProject = False
    for proj in projectDb:
        if proj.getProjectId() == projectid:
            foundProject = True
            # proj.addAuthUsers([request.json['username']])
            return jsonify({'success': True, 'foundProject': foundProject, 'projectId': projectid})
    return jsonify({'success': False, 'foundProject': foundProject, 'projectId': projectid})


@app.route('/api/leaveProject/<int:projectid>', methods=['POST'])
def leaveProject(projectid):
    for proj in projectDb:
        if proj.getProjectId() == projectid:
            # if proj.removeAuthUsers([request.json['username']]):
            return jsonify({'success': True})
    return jsonify({'success': False})


@app.route('/api/resetHardwareSets', methods=['GET', 'POST'])
def resetHardwareSets():
    for proj in projectDb:
        proj.resetHwSets()
    return jsonify({'success': True})


if __name__ == '__main__':
    app.run(port=8000, debug=True)
