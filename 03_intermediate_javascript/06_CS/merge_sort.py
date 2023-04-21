def merge(L, R):
  i=j=0
  output = []
  
  while i< len(L)  and j < len(R):
    if L[i] < R[j]:
      output.append(L[i])
      i+=1
    else:
      output.append(R[j])
      j+=1
  
  #  remaining elemnts picked from current pointer
  output.extend(L[i:])
  output.extend(R[j:])

  return output

def merge_sort(arr):
  if len(arr) == 1:
    return arr
 
  mid = len(arr) // 2

  left_partion = merge_sort(arr[:mid])
  right_partion = merge_sort(arr[mid:])

  return merge(left_partion, right_partion)

# sorted_list = merge_sort([6,5,12,10,9,1])
# print(sorted_list)