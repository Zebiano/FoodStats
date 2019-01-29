// Requires
const controllerVerifications = require('/home/ubuntu/workspace/backend/controller/verifications.controller.js');

// formatString();
test('formatString() with Arroz', function() {
    expect(controllerVerifications.formatString('Arroz')).toBe('Arroz');
})
test('formatString() with massa', function() {
    expect(controllerVerifications.formatString('massa')).toBe('Massa');
})
test('formatString() with couve-flor', function() {
    expect(controllerVerifications.formatString('couve-flor')).toBe('Couve-flor');
})
test('formatString() with carne picada', function() {
    expect(controllerVerifications.formatString('carne picada')).toBe('Carne Picada');
})

// verifyIfExists();
test('verifyIfExists() with array that has existing value.', function() {
    expect(controllerVerifications.verifyIfExists(new Array('Arroz', 'massa', 'couve-flor', 'carne picada'), new Array('Arroz', 'massa', 'couve-flor', 'carne picada'))).toEqual(true);
})
test('verifyIfExists() with array that doesnt have existing value.', function() {
    expect(controllerVerifications.verifyIfExists(new Array('1', '2', '3', '4'), new Array('Arroz', 'massa', 'couve-flor', 'carne picada'))).toEqual(false);
})
test('verifyIfExists() with existing string.', function() {
    expect(controllerVerifications.verifyIfExists('Arroz', new Array('Arroz', 'massa', 'couve-flor', 'carne picada'))).toEqual(true);
})
test('verifyIfExists() with non-existing string.', function() {
    expect(controllerVerifications.verifyIfExists('Cebola', new Array('Arroz', 'massa', 'couve-flor', 'carne picada'))).toEqual(false);
})

// verifyLength();
test('verifyLength() with correct length.', function() {
    expect(controllerVerifications.verifyLength(4, 4)).toEqual(true);
})
test('verifyLength() with wrong length.', function() {
    expect(controllerVerifications.verifyLength(4, 0)).toEqual(false);
})