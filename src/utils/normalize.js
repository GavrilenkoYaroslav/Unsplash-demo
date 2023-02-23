const normalize = (data, index, entities) => {
  if (!Array.isArray(data)) throw new Error('Data normalization fail. Supporting only iterable data types.');

  const result = entities || new Map();
  for (const item of data) {
    if (index === undefined) throw new Error('Index should be provided for data normalization');
    if (!item.hasOwnProperty(index)) throw new Error(`Can't find '${index}' field`);
    result.set(item[index], item);
  }

  return result;
};

export {
  normalize,
}
