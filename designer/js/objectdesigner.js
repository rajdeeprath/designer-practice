var app = angular.module('objectDesigner', ['ngMaterial', 'angular-spinkit']);

app.controller('applicationController', function($scope, $http) {
	$http.get('data/configuration.json')
       .then(function(response){
          $scope.configuration = response.data.configuration;
		  $scope.objectSets = response.data.configuration.items.set;
		  $scope.colors = response.data.configuration.colors.color; 
		  $scope.loading = false;
		  
			var selected = $scope.objectSets[0, $scope], previous = null;
			$scope.selectedIndex = 0;
			$scope.$watch('selectedIndex', function(current, old){
			previous = selected;
			selected = $scope.objectSets[current, $scope];
			});
			
			$scope.loadItemImage = function($object){
				selectObject($scope, $object);
			}
			
			
			$scope.setTextColor = function($color){
				setText($scope, $color)
			}
			
			
			$scope.generateTextSamples = function($obj){
				console.log($obj);
			}
			
			
			// auto select
			selectObject($scope, $scope.objectSets[0].object[0]);
		  		        
		  });
});


function selectObject($scope, $object)
{
	$scope.activeItemImage = $object.main + "?rand=" + new Date().getTime();
	console.log("$scope.activeItemImage ="  +$scope.activeItemImage);
}


function setText($scope, $color)
{
	$scope.activeTextColor = $color;
	console.log("$scope.activeTextColor ="  + JSON.stringify($scope.activeTextColor));
}


app.directive('backImg', function(){
    return function(scope, element, attrs){
       
	   var url = scope.object.preview; 	   
	   element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
});


app.directive('backColor', function(){
    return function(scope, element, attrs){
       
	   var color = scope.color.value[0];
	   color = color.replace("0x", "#");	   
	   element.css({
            'background-color': color,
            'background-size' : 'cover'
        });
    };
});



app.directive('myMaxlength', ['$compile', '$log', function($compile, $log) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, elem, attrs, ctrl) {
			attrs.$set("ngTrim", "false");
			var maxlength = parseInt(attrs.myMaxlength, 10);
			ctrl.$parsers.push(function (value) {
				//$log.info("In parser function value = [" + value + "].");
				if (value.length > maxlength)
				{
					//$log.info("The value [" + value + "] is too long!");
					value = value.substr(0, maxlength);
					ctrl.$setViewValue(value);
					ctrl.$render();
					//$log.info("The value is now truncated as [" + value + "].");
				}
				return value;
			});
		}
	};
}]);




app.service('StyleGeneratorService', function($q,$compile,$http) {
    this.getData = function() {
        var promise = $http.get('php/generator.php');
        promise = promise.then(function (response) {
            return response.data;
        });
        return promise;
    };
});

