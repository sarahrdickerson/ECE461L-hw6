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

    def getHwSets(self):
        return self.__hwSets

    def getNumHwSets(self):
        return self.__numHwSets

    def getProjectId(self):
        return self.__projectId

    def getName(self):
        return self.__name

    def removeHwSet(self, hwSet):
        self.__hwSets.remove(hwSet)
        self.__numHwSets -= 1

    def removeAuthUser(self, user):
        self.authUsers.remove(user)
        self.numAuthUsers -= 1


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
