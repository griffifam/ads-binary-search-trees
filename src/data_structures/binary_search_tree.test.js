import BinarySearchTree from './binary_search_tree';

const dataStructures = [
  BinarySearchTree,
  // We'll add more next week
];

dataStructures.forEach(TargetDS => {
  describe(TargetDS, () => {
    let bst;
    beforeEach(() => {
      bst = new TargetDS();
    });

    it('starts empty', () => {
      expect(bst.count()).toBe(0);
    });

    describe('lookup', () => {
      it('returns undefined on an empty tree', () => {
        expect(bst.lookup('test')).toBe(undefined);
      });

      it('returns undefined if the key is not in the tree', () => {
        const keys = ['many', 'keys', 'for', 'this', 'tree'];
        keys.forEach((key, i) => {
          bst.insert(key);
        });

        expect(bst.lookup('dne')).toBe(undefined);
      });

      it('finds the only record', () => {
        bst.insert('test');
        expect(bst.lookup('test')).toBeTruthy();
      });

      it('finds any extant record', () => {
        const keys = ['many', 'keys', 'for', 'this', 'tree'];
        keys.forEach(key => {
          bst.insert(key);
        });

        keys.forEach(key => {
          expect(bst.lookup(key)).toBeTruthy();
        });

        keys.reverse().forEach(key => {
          expect(bst.lookup(key)).toBeTruthy();
        });
      });

      it('returns the value associated with a record', () => {
        const records = [
          { key: 'one', value: 'first' },
          { key: 'two', value: 'second' },
          { key: 'three', value: 'third' },
          { key: 'four', value: 'fourth' },
          { key: 'five', value: 'fifth' },
        ];

        records.forEach(({ key, value }) => {
          bst.insert(key, value);
        });

        records.forEach(({ key, value }) => {
          expect(bst.lookup(key)).toBe(value);
        });

        records.reverse().forEach(({ key, value }) => {
          expect(bst.lookup(key)).toBe(value);
        });
      });
    });

    describe('insert', () => {
      it('increases count by 1', () => {
        expect(bst.count()).toBe(0);
        bst.insert('test');
        expect(bst.count()).toBe(1);

        const keys = ['many', 'keys', 'for', 'this', 'tree'];
        keys.forEach((key, i) => {
          bst.insert(key);
          expect(bst.count()).toBe(2 + i);
        });
      });

      it('replaces records with the same key and does not increase the count', () => {
        bst.insert('test', 'first value');
        expect(bst.count()).toBe(1);
        expect(bst.lookup('test')).toBe('first value');

        bst.insert('test', 'second value');
        expect(bst.count()).toBe(1);
        expect(bst.lookup('test')).toBe('second value');
      });

      it('uses true as the default value', () => {
        bst.insert('test');
        expect(bst.lookup('test')).toBe(true);
      });
    });

    describe('delete', () => {
      it('returns the value for the removed record', () => {
        expect(bst.count()).toBe(0);
        bst.insert('1st', 'first value');
        bst.insert('2nd', 'second value');
        bst.insert('3rd', 'third value');
        expect(bst.count()).toBe(3);

        bst.delete('2nd');
        expect(bst.count()).toBe(2);
      });

      it('returns undefined if the record was not found', () => {
        expect(bst.count()).toBe(0);
        bst.insert('1st', 'first value');
        bst.insert('2nd', 'second value');
        expect(bst.count()).toBe(2);

        let expected = bst.delete('3rd');
        expect(expected).toBe(undefined);
      });

      it('reduces the count by 1', () => {
        expect(bst.count()).toBe(0);
        bst.insert('1st', 'first value');
        bst.insert('2nd', 'second value');
        expect(bst.count()).toBe(2);

        bst.delete('2nd');
        expect(bst.count()).toBe(1);
      });

      it('omits the removed record from iteration results', () => {
        const keys = [['many', 'keys'], ['for', 'this'], ['kinda','tree']];
        keys.forEach((key, i) => {
          bst.insert(key[0], key[1]);
          expect(bst.count()).toBe(1 + i);
        });

        bst.delete('for');
        expect(bst.lookup('for')).toBe(undefined);
        expect(bst.count()).toBe(2);
      });

      it('can remove every element in a tree', () => {
        const keys = [['many', 'keys'], ['for', 'this'], ['kinda','tree']];
        keys.forEach((key, i) => {
          bst.insert(key[0], key[1]);
          expect(bst.count()).toBe(1 + i);
        });
        keys.forEach((key, i) => {
          bst.delete(key[0]);
        });

        expect(bst.count()).toBe(0);
      });

      describe('scenarios', () => {
        // The first step for each of these tests will be to construct
        // a tree matching the scenario. How can you use your knowledge
        // of how insert works to do this? How can you check your work?

        it('can remove the record with the smallest key', () => {
          // TODO:
          const keys = [[1, 'one'], [4, 'four'], [9, 'nine'], [5, 'five'], [2, 'two']];
          // Insert several records
          keys.forEach((key, i) => {
            bst.insert(key[0], key[1]);
            expect(bst.count()).toBe(1 + i);
          });
          // Remove the record with the smallest key
          var smallestKey = 100;
          keys.forEach((key) => {
            if (key[0] < smallestKey) {
              smallestKey = key[0];
            };
          });
          expect(bst.lookup(smallestKey)).toBe('one');
          bst.delete(smallestKey);
          // // Ensure that looking up that key returns undefined
          expect(bst.lookup(smallestKey)).toBe(undefined);
        });

        it('can remove the record with the largest key', () => {
          // TODO:
          const keys = [[1, 'one'], [4, 'four'], [9, 'nine'], [5, 'five'], [2, 'two']];
          // Insert several records
          keys.forEach((key, i) => {
            bst.insert(key[0], key[1]);
            expect(bst.count()).toBe(1 + i);
          });
          // Remove the record with the largest key
          var largestKey = 0;
          keys.forEach((key) => {
            if (key[0] > largestKey) {
              largestKey = key[0];
            };
          });
          expect(bst.lookup(largestKey)).toBe('nine');
          bst.delete(largestKey);
          // // Ensure that looking up that key returns undefined
          expect(bst.lookup(largestKey)).toBe(undefined);
        });

        it('can remove the root', () => {
          const keys = [[1, 'one'], [4, 'four'], [9, 'nine'], [5, 'five'], [2, 'two']];
          // Insert several records
          keys.forEach((key, i) => {
            bst.insert(key[0], key[1]);
            expect(bst.count()).toBe(1 + i);
          });

          // Remove root
          let root = keys[0];
          expect(bst.lookup(root[0])).toBe('one');
          bst.delete(root[0]);
          expect(bst.lookup(root[0])).toBe(undefined);
        });

        it('can remove a node with no children', () => {
          const keys = [[1, 'one'], [4, 'four']];
          // Insert several records
          let count = 0;
          keys.forEach((key, i) => {
            bst.insert(key[0], key[1]);
            count ++;
          });

          let lastNode = keys[count - 1];
          expect(bst.lookup(lastNode[0])).toBe(lastNode[1]);
          bst.delete(lastNode[0]);
        });

        xit('can remove a node with only a left child', () => {

        });

        xit('can remove a node with only a right child', () => {

        });

        xit('can remove a node with both children, where the successor is the node\'s right child', () => {

        });

        xit('can remove a node with both children, where the successor is not the node\'s right child', () => {

        });
      });
    });

    describe('forEach', () => {
      let records;
      beforeEach(() => {
        records = [
          { key: 'one', value: 'first' },
          { key: 'two', value: 'second' },
          { key: 'three', value: 'third' },
          { key: 'four', value: 'fourth' },
          { key: 'five', value: 'fifth' },
        ];
      });

      const sortRecords = (records) => {
        return records.sort((a, b) => a.key.localeCompare(b.key));
      }

      const fill = (records) => {
        records.forEach(({ key, value }) => {
          bst.insert(key, value);
        });
      }

      it('runs the callback 0 times on an empty tree', () => {
        const cb = jest.fn();
        bst.forEach(cb);

        expect(cb.mock.calls.length).toBe(0);
      });

      it('provides {key, value}, index and tree as cb args', () => {
        bst.insert('key', 'value');

        const cb = jest.fn();
        bst.forEach(cb);

        const callArgs = cb.mock.calls[0];
        expect(callArgs[0].key).toBe('key');
        expect(callArgs[0].value).toBe('value');
        expect(callArgs[1]).toBe(0);
        expect(callArgs[2]).toBe(bst);
      });

      it('iterates records in key order', () => {
        fill(records);

        const cb = jest.fn();
        bst.forEach(cb);

        sortRecords(records).forEach(({ key, value }, i) => {
          const callArgs = cb.mock.calls[i];
          expect(callArgs[0].key).toBe(key);
          expect(callArgs[0].value).toBe(value);
          expect(callArgs[1]).toBe(i);
          expect(callArgs[2]).toBe(bst);
        });
      });

      it('iterates correctly for sorted input', () => {
        fill(sortRecords(records));

        const cb = jest.fn();
        bst.forEach(cb);

        sortRecords(records).forEach(({ key, value }, i) => {
          const callArgs = cb.mock.calls[i];
          expect(callArgs[0].key).toBe(key);
          expect(callArgs[0].value).toBe(value);
          expect(callArgs[1]).toBe(i);
          expect(callArgs[2]).toBe(bst);
        });
      });

      it('iterates correctly for reverse-sorted input', () => {
        fill(sortRecords(records).reverse());

        const cb = jest.fn();
        bst.forEach(cb);

        sortRecords(records).forEach(({ key, value }, i) => {
          const callArgs = cb.mock.calls[i];
          expect(callArgs[0].key).toBe(key);
          expect(callArgs[0].value).toBe(value);
          expect(callArgs[1]).toBe(i);
          expect(callArgs[2]).toBe(bst);
        });
      });
    });
  });
});