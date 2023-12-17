export default {
  prepend: (val) => {
    return () => val
  },
  append: (val) => {
    return () => val;
  }
}
