// ----------------------------------------------------------------------------
// File: LightableTests.js
//
// Copyright (c) 2014 VoodooJs Authors
// ----------------------------------------------------------------------------



/**
 * Test cases to make sure the Lightable class works as expected.
 *
 * @constructor
 */
LightableTests = TestCase('LightableTests');


/**
 * Shutdown the engine between test cases.
 */
LightableTests.prototype.tearDown = function() {
  var voodooEngine = voodoo.engine;
  if (voodooEngine)
    voodooEngine.destroy();
};


/**
 * Tests that the Lightable class can be extended from other types.
 */
LightableTests.prototype.testLightableExtend = function() {
  var LightableBase = SimpleModel.extend(voodoo.Lightable);
  var BaseLightable = voodoo.Lightable.extend(SimpleModel);

  var instance1 = new LightableBase();
  var instance2 = new BaseLightable();

  instance1.ambient = 'black';
  instance2.setEmissive('blue');
};


/**
 * Tests that the changeAmbient, changeEmissive and changeShading events work.
 */
LightableTests.prototype.testLightableEvents = function() {
  var Lightable = voodoo.Lightable.extend(DummyModel);
  var instance = new Lightable();

  var changeAmbient = 0;
  var changeEmissive = 0;
  var changeShading = 0;

  instance.on('changeAmbient', function() { changeAmbient++; });
  instance.on('changeEmissive', function() { changeEmissive++; });
  instance.on('changeShading', function() { changeShading++; });

  instance.ambient = 'yellow';
  instance.emissive = 'red';
  instance.shading = voodoo.Lightable.ShadingStyle.Flat;

  instance.setAmbient('green');
  instance.setEmissive('blue');
  instance.setShading(voodoo.Lightable.ShadingStyle.None);

  assertEquals(2, changeEmissive);
  assertEquals(2, changeAmbient);
  assertEquals(2, changeShading);
};