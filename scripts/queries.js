const ctable = require('console.table');

// Write all the query functions
    // Each one needs to take the connection parameter, display results, THEN call start(connection)
//     .then((answer) => {
//         // when finished prompting, insert a new item into the db with that info
//         connection.query(
//           'INSERT INTO auctions SET ?',
//           // QUESTION: What does the || 0 do?
//           {
//             item_name: answer.item,
//             category: answer.category,
//             starting_bid: answer.startingBid || 0,
//             highest_bid: answer.startingBid || 0,
//           },
//           (err) => {
//             if (err) throw err;
//             console.log('Your auction was created successfully!');
//             // re-prompt the user for if they want to bid or post
//             start();
//           }
//         );
//       });
//   };

// Export all the query functions