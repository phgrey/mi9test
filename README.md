#Test task comments

## requirements
nodejs.v6

npm & gulp should be in run paths
 

## Installation and running
    npm i && gulp
than go to http://localhost:3000 or some another port (can be found in nestat -tpln e.g.)

## Implementation notes

As I understood the test task was created in a hurry, so I did not follow instructions totally. I did the task the way it was a real production task instead. Sure with test task time limitations in mind.

- The main task can be implemented at the client-side, so in fact we do not need express.js here at all - just React. I'd like to display KISS'ing instead of express.js knowledge. U can examine it by the next point e.g. :)))  

- The jsx transform can be implemented using express middleware - on-fly generating, but this is not industry standart, it's closer to the rail's pipeline w/o precompile. take a look at the lib/jsx-middleware.js. For now gulp is used

- Column-oriented form elements will look a bit prettier, make things look closer to IDE git diff functionality
 
- Three-files comparision is leading to classification tasks, some distance calculating and so on up to machine learning.

- The algorithms in external diff lib are suitable and production-ready. I need a reason to write something worse. And it takes too long for the test task to understand them and implement by my own.

- For the app of this size sadly there is also no place to insert redux or other dataflow standards.