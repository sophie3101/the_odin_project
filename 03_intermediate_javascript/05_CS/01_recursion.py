def sum_range(n):
    if n == 1: return 1
    return n + sum_range(n-1)

def power(base, n):
    if n == 0: return 1
    return base * power(base, n-1)

def factorial(n):
    if n == 1: return 1
    return n * factorial(n-1)

def all(arr, func):
    if len(arr) == 0: return True
    
    if( func(arr.pop())): 
        return all(arr, func)
    else:
        return False

def lessThanSeven(n):
    return n < 7 

def product_of_array(arr):
    if len(arr) == 0: return 1

    return arr.pop()*product_of_array(arr)

def contains(dictionary, value):
    for k,v in dictionary.items():
        if type(dictionary.get(k)) is dict:
            return contains(dictionary.get(k), value)
        else:
            if v == value:
                return True 
    return False
    

def totalIntegers(arr):
    # parse multi dimensional int arr, return total number of integers stred inside this array
    if len(arr) ==0: return 0
    total = 0

    extract = arr.pop()

    if type(extract) is list:
        total += totalIntegers(extract)
  
    elif type(extract) is int:
        total += 1
    
    return total+ totalIntegers(arr)

def sumSquares(arr):
    if len(arr) == 0: return 0
  
    item = arr.pop()
    square = 0
    if type(item) is list:
        square += sumSquares(item)
    elif type(item) is int:
        square += item*item
    return square + sumSquares(arr)

def replicate(times, num):
    if times <= 0:
        return []

    return [num] + (replicate(times-1, num))

print(replicate(1,69))
print(replicate(3,5))
# print(sumSquares([10,[[10],10],[10]] ))
# print(totalIntegers([[[5], 3], 0, 2, ['foo'], [], [4, [5, 6]]]))
# print(contains({"data":{"info":{"stuff":{"thing":{"moreStuff":{"maginNumber":44, "something": 'foo2'}}}}}}, 'foo2'))
# print(product_of_array([2,3,1]))
# print(all([1,2,9], lessThanSeven))
# print(factorial(5))
# print(sum_range(5))
# print(power(2,4))
# print(power(2,0))