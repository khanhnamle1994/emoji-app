(function () {
    'use strict';

    angular
        .module('main')
        .controller('AuthorCtrl', AuthorCtrl);

    function AuthorCtrl($stateParams, $scope, DEFAULT_IMAGE, AdminAuthorsService, Flash, $log) {
        var vm = this;

        vm.author = {};

        vm.DEFAULT_IMAGE = DEFAULT_IMAGE;

        getAuthor($stateParams.slug);

        function getAuthor(slug) {
            function success(response) {
                response.data.object.metadata.born = new Date(response.data.object.metafields[2].value);
                response.data.object.metadata.died = new Date(response.data.object.metafields[3].value);
                vm.author = response.data.object;
            }

            function failed(response) {
                $log.error(response);
            }

            AdminAuthorsService
                .getAuthorBySlug(slug)
                .then(success, failed);
        }
    }
})();
