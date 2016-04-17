exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('fish').del(), 

    // Inserts seed entries
    
    knex('fish').insert({
        id: 1,
        x: 105,
        y: 105,
        angler: 'Terry Terry',
        weight: '',
        dateCaught: '4/5/2015',
        timeCaught: '6:32',
        lure: "feather",
        comment: 'this is a comment'
    })
  );
};
