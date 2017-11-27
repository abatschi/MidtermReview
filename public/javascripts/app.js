angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
     $scope.candidates = [];
	
	$scope.selectedCandidates=[];
	$scope.submitted=false;

     $scope.addCandidate = function() {
       if($scope.formContent === '') { return; }
       $scope.create({
        name: $scope.formContent,
        votes: 0,
      });
      $scope.formContent = '';
    };

$scope.create = function(candidate) {
    return $http.post('/candidate', candidate).success(function(data){
      $scope.candidates.push(data);
    });
  };

$scope.incrementUpvotes = function(comment) {
      $scope.upvote(comment);
    };

$scope.submitVotes = function() {
	$scope.submitted=true;
   for(var selected of $scope.selectedCandidates){
      $http.put('/candidate/' + selected._id + '/upvote')
        .success(function(data){
          selected.votes += 1;
        });
   }
    };

$scope.selectionChange = function(candidate) {
   if(!$scope.submitted){
	var index = $scope.selectedCandidates.indexOf(candidate);
	if(index==-1){
		$scope.selectedCandidates.push(candidate);
	}
	else{
		$scope.selectedCandidates.splice(index, 1);  
	}
    }
};

$scope.delete = function(candidate) {
      $http.delete('/candidates/' + candidate._id )
        .success(function(data){
          $scope.getAll();
        });
      
    };

     $scope.getAll = function() {
    	return $http.get('/candidate').success(function(data){
   	   angular.copy(data, $scope.candidates);
   	 });
      };
     $scope.getAll();

  }
]);