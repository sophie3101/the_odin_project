from merge_sort import merge, merge_sort 

class Node:
    def __init__(self, value):
        self.value = value
        self.left = None 
        self.right = None

class printTree:
    def __init__(self, root):
        self.root = root
        self.height = self.getHeight(self.root)
        self.width = self.height * 2
        self.output = [['']*self.width for i in range(self.height)]
        self.print_tree()

    def getHeight(self, node):
        if node == None: return 0
        return 1 + max(self.getHeight(node.left), self.getHeight(node.right))
    

    def updateOutput(self, node, row_index, left, right):   
        if node is None:
            return
        mid = (left + right) //2
        self.output[row_index][mid] = str(node.value)
        self.updateOutput(node.left, row_index + 1, left, mid)
        self.updateOutput(node.right, row_index+1, mid, right)

    def print_tree(self):
        self.updateOutput(self.root, 0, 0, self.width)
        for row in self.output:
            print(row)
            # print('  '.join(s for s in row))
        
class Tree:
    def __init__(self, arr): #arr is sorted array
        self.arr = self.sort_array(arr)
        print('sorted array ',self.arr)
        self.root = self.build_tree(self.arr)
    
    def sort_array(self, arr):
        return merge_sort(arr)
        
    def build_tree(self, array):
        if len(array) == 0: return #Node(array[0])
        mid_index = len(array) // 2
        # print('mid ', array, array[mid_index], array[:mid_index], array[mid_index+1:])
        node = Node(array[mid_index])
        node.left = self.build_tree(array[:mid_index])
        node.right = self.build_tree(array[mid_index+ 1:])
        # print("node ", node.value)
        return node

    def pretty_print(self):
        pt = printTree(self.root)
    
    def insert(self, value, node):
        if node is None:
            return Node(value)
     
        if value < node.value:
            node.left = self.insert(value, node.left)
        else:
            node.right = self.insert(value, node.right)

        return node
    
    def minValueNode(self, node): 
        # find closest node with min value to the node
        # => look at all the left nodes of the right node with regard to that target node
        pointer = node
        while pointer.left is not None:
            pointer = pointer.left
        return pointer
    
    def delete(self, value, node):       
        if node.value > value:
            node.left = self.delete(value, node.left)
        elif node.value < value:
            node.right = self.delete(value, node.right)
        else:
            # if node has one child or no child
            if node.left is None:
                return node.right
            elif node.right is None:
                return node.left
          # if node has two children
            node_to_replace = self.minValueNode(node.right)
            node.value = node_to_replace.value
            self.delete(node_to_replace.value,node.right)
        return node
  
    def find(self, value, node):
        if node.value == value or node is None:
            return node 
        
        if node.value > value:
            return self.find(value, node.left)
        else: 
            return self.find(value, node.right)
    
    # traverse tree
    def inorder(self, node): #left root right
        if node is None: 
            return
        
        self.inorder(node.left)
        print(node.value, end = ", ")
        self.inorder(node.right)
    
    def preorder(self, node): # root left right
        if node is None:return
        print(node.value, end = ", ")
        self.preorder(node.left)
        self.preorder(node.right)
        
    def postorder(self, node): #left right root
        if node is None: return
        self.postorder(node.left)
        self.postorder(node.right)
        print(node.value, end = ", ")
if __name__ == "__main__":
    # arr = [i for i in range(10)]
    arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
    bst = Tree(arr)
    bst.insert(7000,  bst.root)
    bst.pretty_print()
    bst.inorder(bst.root)
    # print(bst.find(4, bst.root).value)
    # bst.delete(4, bst.root)
    # print("delete 4")
    # bst.pretty_print()
    # bst.delete(8, bst.root)
    # print('delete root')
    # bst.pretty_print()
    # bst.delete(7000, bst.root)
    # bst.pretty_print()
    # bst.delete(6345, bst.root)
    # print('deleting 6346')
    # bst.pretty_print()
   

    
  