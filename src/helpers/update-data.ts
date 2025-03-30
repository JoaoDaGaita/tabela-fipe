export function updateData(currentObject: any, newDataObject: any): any {
  const result = { ...currentObject }

  for (const key in newDataObject) {
    if (key in currentObject) {
      result[key] = newDataObject[key]
    }
  }

  return result
}
