var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      var productsICanEat = _.filter(products, function(obj){
        return !obj.containsNuts && _.every(obj.ingredients, function(val){
          return val !== "mushrooms";
        })
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = 233168;    /* try chaining range() and reduce() */

    expect(233168).toBe(_.reduce(_.range(1, 1000), function(memo, num){
      return memo + ((num % 3 === 0 || num % 5 === 0)? num : 0);
      // return memo + num;
    }, 0));
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    // _.map(products,_.flatten);
    
    // ingredientCount = _.chain(products)
    //   .map(function(product){return product.ingredients})
    //   .flatten()
    //   .reduce(function(counts, ingredient){
    //     counts[ingredient] = (counts[ingredient] || 0) + 1;
    //     return counts;
    //   },{})
    //   .value()
    
    _.chain(products)
      .map(function(product){return product.ingredients})
      .flatten()
      .reduce(function(undefined, ingredient){
        ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
      })
      .value()

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    // while not equal to composite number add to product array and pass divided num
    var findLargePrime = function(num){
      var productArr = [];
      var run = true;
      var orgNum = num;
      var i = 2;
      while(run){
        if(num % i === 0){
          console.log('hit');
          productArr.push(i);
          num = num / i;
            run = _.reduce(productArr, function(memo, num){
              return memo * num;
            }, 1) === orgNum ? false : true; 
        }else{
          i++;
        }
      }
      return _.last(productArr);
    };
    // if equal then return last number of an array

    expect(findLargePrime(25)).toBe(5);

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
    var findLargePalindrome = function(){
      var max = 1;
      var factor1 = 1;
      var factor2 = 1;
      for(var i = 999; i > 99; i--){
        for(var j = 999; j > 99; j--){
          var product = i * j;
          if(product.toString().split("").reverse().join("") === product.toString() && max < product){
            max = product;
            factor1 = i;
            factor2 = j;
          }          
        }
      }
      console.log(factor1, factor2);
      return max;
    }
    
    expect(findLargePalindrome()).toBe(906609);

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var smallestNumDiv = function(num){
      var numbers = _.range(2,num + 1);
      var result = 1;
      var gcd = function(a, b){
        var found = false;
        var gcdNum = 1;
        var j = Math.min(a, b);
        var k = j;
        while(!found && j > 1){
          if(a % j === 0 && b % j === 0){
            found = true;
            gcdNum = j;
          }else{
            j--;
          }
        }
        return gcdNum;
      }
      for(var i = 0; i < numbers.length; i++){
        result = result * numbers[i] / gcd(numbers[i], result);
      }
      return result;
    };

    expect(smallestNumDiv(20)).toBe(232792560);

  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var findDiffSquare = function(arr){
      var sumSquare = 0;
      var squareSum = 0; 
      _.each(arr,function(value){
        sumSquare += value * value;
      });
      _.each(arr,function(value){
        squareSum += value;
      });
      return Math.abs(squareSum * squareSum - sumSquare);
    }
    
    expect(findDiffSquare([1, 2, 3])).toBe(22);

  });

  it("should find the 10001st prime", function () {
    var findPrime = function(orderNum){
      var primeArr = [];
      var i = 2;
      while(primeArr.length !== orderNum){
        var j = 0
        var found = false;
        while(primeArr.length > j && !found){
          if(i % primeArr[j] === 0){
            found = true;
          }else{
            j++;
          }
        }
        if(!found){
          primeArr.push(i)
        }else{
          i++;
        }
      }
      return _.last(primeArr);
    }
    
    expect(findPrime(10001)).toBe(104743);    

  });
  
});
