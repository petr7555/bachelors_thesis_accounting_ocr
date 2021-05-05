/**
 * Dummy implementation, because NetInfo from '@react-native-community/netinfo' does not work on Windows yet.
 * Will be used only on Windows.
 */

const execIfOnline = (func: () => void) => func();

export default execIfOnline;
