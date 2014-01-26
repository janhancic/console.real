describe('console.real', function () {

	beforeEach(function () {
	});

	describe('initialisation', function () {
		it('console.real is defined', function () {
			expect(console.real).toBeDefined();
			expect(console.real.log).toBeDefined();
		});
	});

});
