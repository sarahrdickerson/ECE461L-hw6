class Project:
    def __init__(self, name, projectId):
        self.__name = name
        self.__projectId = projectId
        self.__numHwSets = 0
        self.__hwSets = []
        self.numAuthUsers = 0
        self.authUsers = []

    def addHwSet(self, hwSet):
        self.__hwSets.append(hwSet)
        self.__numHwSets += 1

    def addAuthUser(self, user):
        self.authUsers.append(user)
        self.numAuthUsers += 1

    def addAuthUsers(self, users):
        self.authUsers.extend(users)
        self.numAuthUsers += len(users)

    def getHwSets(self):
        return self.__hwSets

    def getNumHwSets(self):
        return self.__numHwSets

    def getProjectId(self):
        return self.__projectId

    def getName(self):
        return self.__name

    def removeHwSet(self, hwSet):
        if hwSet in self.__hwSets:
            self.__hwSets.remove(hwSet)
            self.__numHwSets -= 1
            return True
        return False

    def removeAuthUser(self, user):
        if user in self.authUsers:
            self.authUsers.remove(user)
            self.numAuthUsers -= 1
            return True
        return False

    def resetHwSets(self):
        for hwSet in self.__hwSets:
            hwSet.setNumCheckedOut(0)

    def to_dict(self):
        return {
            'name': self.__name,
            'projectId': self.__projectId,
            'numHwSets': self.__numHwSets,
            'hwSets': [h.to_dict() for h in self.__hwSets],
            'numAuthUsers': self.numAuthUsers,
            'authUsers': self.authUsers
        }


class HwSet:
    def __init__(self, name, capacity=0):
        self.__name = name
        self.__capacity = capacity
        self.__numCheckedOut = 0

    def getName(self):
        return self.__name

    def getCapacity(self):
        return self.__capacity

    def getNumCheckedOut(self):
        return self.__numCheckedOut

    def setCapacity(self, capacity):
        self.__capacity = capacity

    def setNumCheckedOut(self, numCheckedOut):
        self.__numCheckedOut = numCheckedOut

    def checkOut(self, qty=1):
        if self.__numCheckedOut + qty <= self.__capacity:
            self.__numCheckedOut += qty
            return True
        else:
            return False

    def checkIn(self, qty=1):
        if self.__numCheckedOut - qty >= 0:
            self.__numCheckedOut -= qty
            return True
        else:
            return False

    def isFull(self):
        return self.__numCheckedOut == self.__capacity

    def to_dict(self):
        return {
            'name': self.__name,
            'capacity': self.__capacity,
            'numCheckedOut': self.__numCheckedOut
        }
