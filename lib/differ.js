import diff from 'difflib'

/**
 * simple output formatting
 * @param key - symbol for operation legend - [*+=\ ]
 * @param arr - array to take items from
 * @param from - first item index
 * @param to - last item index
 * @return {Array}
 */
function line(key, arr, from, to){
    var ret = [];
    for(var i = from; i < to; i++)
        ret.push([key, arr[i]])
    return ret;
}

/**
 * The function that implements the comparision mechanism as described
 * in fact it just formats the results according to a specs, all interesting stuff is in the external lib
 * @param a - first array of strings to compare
 * @param b - second array of strings to compare
 *
 * @return array - the compare result
 */
export default function compare(a,b){
    var comparer = new diff.SequenceMatcher(null, a, b),
        corrections = comparer.getOpcodes();

    return corrections.reduce(function(memo, correction){
        var tag, alo, ahi, blo, bhi, add;
        [tag, alo, ahi, blo, bhi] = correction;


        switch (tag) {
            case 'replace':
                //if we will got the 'replace' block with different line numbers in comparing sequences
                //we will have to use another comparing algorithm
                if(ahi-alo != bhi-blo)
                    throw new Error('Modified block with non-matched line numbers')
                add = line('*', a, alo, ahi);
                //here we will do add non-matched elements from the second array
                line('*', b, blo, bhi).forEach((item, index)=> {
                   add[index][1] += `|${item[1]}`})
                break;
            case 'delete':
                add = line('-', a, alo, ahi);
                break;
            case 'insert':
                add = line('+', b, blo, bhi);
                break;
            case 'equal':
                add = line(' ', a, alo, ahi);
        }

        return memo.concat(add);
    }, []);
}