angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
	$scope.submitted=false;
     $scope.products = [];
	$scope.name = '';
	$scope.price = '';
	$scope.pictureUrl = '';

	$scope.selectedProducts=[];

     $scope.addProduct = function() {
       if($scope.name === '' || $scope.price === '' || $scope.pictureUrl==='') { return; }
       $scope.create({
        name: $scope.name,
	price: $scope.price,
	pictureUrl: $scope.pictureUrl,
        numOrdered: 0,
      });
      $scope.name = '';
	$scope.price = '';
	$scope.pictureUrl = '';
    };

$scope.create = function(product) {
    return $http.post('/product', product).success(function(data){
      $scope.products.push(data);
    });
  };

$scope.incrementNumOrdered = function(product) {
      $scope.upNumOrdered(product);
    };

$scope.submitProducts = function() {
$scope.submitted=true;
   for(var selected of $scope.selectedProducts){
      $http.put('/product/' + selected._id + '/upNumOrdered')
        .success(function(data){
          selected.numOrdered += 1;
        });
   }
    };

$scope.selectionChange = function(product) {
	if(!$scope.submitted){
	var index = $scope.selectedProducts.indexOf(product);
	if(index==-1){
		$scope.selectedProducts.push(product);
	}
	else{
		$scope.selectedProducts.splice(index, 1);  
	}
}
};

$scope.delete = function(product) {
      $http.delete('/products/' + product._id )
        .success(function(data){
          $scope.getAll();
        });
      
    };

     $scope.getAll = function() {
    	return $http.get('/product').success(function(data){
   	   angular.copy(data, $scope.products);
   	 });
      };
     $scope.getAll();

  }
]);