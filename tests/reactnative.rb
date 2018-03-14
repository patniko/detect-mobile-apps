# File:  tc_simple_number.rb

require_relative "../main"
require "test/unit"
 
class ReactNative < Test::Unit::TestCase
  # Is React Native app
  def test_package_json
    assert_equal(4, SimpleNumber.new(2).add(2) )
    assert_equal(6, SimpleNumber.new(2).multiply(3) )
  end

   # Is Expo app
   def test_package_json
    assert_equal(4, SimpleNumber.new(2).add(2) )
    assert_equal(6, SimpleNumber.new(2).multiply(3) )
  end

   # Is ejected Expo app
   def test_package_json
    assert_equal(4, SimpleNumber.new(2).add(2) )
    assert_equal(6, SimpleNumber.new(2).multiply(3) )
  end

   # Is unejected Expo app
   def test_package_json
    assert_equal(4, SimpleNumber.new(2).add(2) )
    assert_equal(6, SimpleNumber.new(2).multiply(3) )
  end

end