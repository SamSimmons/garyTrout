exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('fish').del(), 

    // Inserts seed entries
    
    knex('fish').insert({
        x: 5,
        y: 5,
        angler: 'Terry Terry',
        dateCaught: '4/5/2015',
        timeCaught: '6:32',
        lure: "feather",
        comment: 'this is a comment'
    })
  );
};
