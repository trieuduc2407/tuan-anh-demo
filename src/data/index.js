import France from "./France";
import USA from "./USA";
import SimpleCountries from "./SimpleCountries";
import USSR from "./USSR";
import Vietnam from "./Vietnam";
import China from "./China";

export default {
    // ...SimpleCountries,  // Type B countries (single marker each)
    [France.id]: France,  // Type A (has SubMap)
    // [USA.id]: USA,        // Type A (has SubMap)
    // [USSR.id]: USSR,      // Type A (has SubMap)
    // [Vietnam.id]: Vietnam, // Type A (has SubMap)
    // [China.id]: China, // Type A (has SubMap)
}