const Node = (value) => {
  value = value === null ? null : value;
  next = null;
  return {
    value,
    next,
  };
};

const LinkedList = () => {
  let head = null;
  let size = 0;

  const toString = () => {
    let stringToPrint = "";
    let curNode = head;
    while (curNode !== null) {
      stringToPrint += `${curNode.value} ->`;
      curNode = curNode.next;
    }
    stringToPrint += "null";
    console.log(stringToPrint);
  };

  const append = (value) => {
    if (head === null) {
      head = Node(value);
    } else {
      let curNode = head;
      while (curNode.next !== null) {
        curNode = curNode.next;
      }
      curNode.next = Node(value);
    }
    size++;
  };

  const prepend = (value) => {
    const newHead = Node(value);
    newHead.next = head;
    head = newHead;
    size++;
  };

  const at = (index) => {
    let idx = 0;
    let pointer = head;
    while (idx < index) {
      pointer = pointer.next;
      idx++;
    }
    return pointer;
  };

  const getSize = () => size;

  const getHead = () => head;

  const getTail = () => {
    let pointer = head;
    while (pointer.next !== null) {
      pointer = pointer.next;
    }

    return pointer;
  };

  const contains = (value) => {
    let pointer = head;
    while (pointer !== null) {
      if (pointer.value === value) return true;
      pointer = pointer.next;
    }
    return false;
  };

  const pop = () => {
    let pointer = head;
    let popNode = null;
    while (pointer.next != null) {
      if (pointer.next.next === null) {
        popNode = pointer.next;
        pointer.next = null;
      } else {
        pointer = pointer.next;
      }
    }
    return popNode;
  };

  const find = (value) => {
    let index = 0;
    let pointer = head;
    while (pointer !== null) {
      if (pointer.value === value) return index;
      pointer = pointer.next;
      index++;
    }

    return -1;
  };

  return {
    append,
    prepend,
    toString,
    getSize,
    at,
    getHead,
    getTail,
    pop,
    contains,
    find,
  };
};

const ll = LinkedList();
ll.append(5);
ll.prepend(4);
ll.append(6);
ll.toString();

console.log("at function ", ll.at(1).value);
console.log("size ", ll.getSize());
console.log("index: ", ll.find(4));
console.log("pop ", ll.pop());
