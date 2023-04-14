class Node:
    def __init__(self, value):
        self.value = value
        self.next = None
    
    def __str__(self):
        return self.value
        
class LinkedList:
    def __init__(self):
        self.head = None
    
    def toString(self):
        currentNode = self.head
        while currentNode != None:
            print(f'{currentNode.value} -> ', end = '')
            currentNode = currentNode.next

        print('null')

    def append(self, value): #add to the end of list
        if self.head is None:
            self.head = Node(value)
        else:
          current = self.head
          while current.next != None:
              current = current.next 
          
          current.next = Node(value)
          
    def prepend(self, value): #add to the start of list
        newNode = Node(value)
        newNode.next = self.head 
        self.head = newNode

    def size(self):
        total = 1
        currentNode = self.head 
        while currentNode.next != None:
            total += 1
            currentNode = currentNode.next 
   
        return total
    
    def head(self):
        print('head')
        return self.head 
    
    def tail(self):
        pointer = self.head 
        while pointer.next != None:
            pointer = pointer.next 

        return pointer
    
    def at(self, index): # return node at given index
        currentNode = self.head
        for i in range(index):
            if currentNode is None:
                return None
            currentNode = currentNode.next 

        return currentNode
       
    def pop(self): # remove last element from the list
        if self.head is None:
            return None 
        
        currentNode = self.head 
        popNode = None
        while currentNode.next != None:
            if currentNode.next.next is None:
                popNode = currentNode.next
                currentNode.next = None 
            else:
                currentNode = currentNode.next
        return popNode

    def contains(self, value): #return true if linked list contain value
        currentNode = self.head 
        while currentNode != None:
            if currentNode.value == value:
                return True 
            currentNode = currentNode.next

        return False
    
    def contains_recursive(self, target, node):
        if node is None: return False
        if node.value == target: return True 
        self.contains_recursive(target, node.next)

    def find(self, value):
        index = 0
        currentNode = self.head 
        while currentNode.next != None:
            if currentNode.value == value:
                return index 
            if currentNode.next.value == value:
                return index + 1
            index += 1
            currentNode = currentNode.next 

        return -1 
    
    def insertAt(self, value, index):
        currentNode = self.at(index)
        
        newNode = Node(value)
        nextNode = currentNode.next
        currentNode.next = newNode
        newNode.next = nextNode

    
    def removeAt(self, index):
        nodeToRemove = self.at(index)
        nodeBefore = self.at(index-1)
        nodeAfter = self.at(index+1)

        if nodeToRemove is None:
            return 
        
        if nodeAfter is None:
            nodeBefore.next = None 
        else:
            nodeBefore.next = nodeAfter

def implementLinkList():
    ll = LinkedList()
    ll.append(1)
    ll.append(2)
    ll.append(100)
    ll.toString()
    ll.prepend(4) 
    ll.append(10)
    print('toString : ')
    ll.toString()
    size = ll.size()
    node2 = ll.at(2)
    pop = ll.pop()
    print('pop node ', pop.value)
    ll.toString()
    print(ll.contains(1))
    print(ll.contains_recursive(1))
    # print(ll.find(4))
    ll.insertAt(22, 1)
    ll.toString()
    ll.removeAt(2)
    ll.toString()
    print(ll.tail().value)
    # print(ll.contains(100))

if __name__ == "__main__":
    implementLinkList()