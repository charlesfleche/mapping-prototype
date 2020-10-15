function showTooltip(ev) {
  console.log(`Entering ${ev.target.id}: show tooltip with candidate name ${ev.target.dataset.candidateName} (not implemented yet)`)
}

function hideTooltip(ev) {
  console.log(`Leaving ${ev.target.id}: hide tooltip (not implemented yet)`)
}

async function main() {

  // Do the API request

  const response = await fetch("/api.json")
  const data = await response.json()

  // Unpack response for convenience

  const parties = data["parties"]
  const candidates = data["candidates"]
  const areas = data["areas"]

  // Now we loop through the areas

  for (const areadId in areas) {
    const area = areas[areadId]

    const candidateId = area["winning_candidate"]
    const candidate = candidates[candidateId]

    const partyId = candidate["party"]

    // We get the area (a path element) from the SVG map

    const areaElem = document.getElementById(areadId)

    // We store the information for an area in the area element dataset

    areaElem.dataset.partyId = partyId
    areaElem.dataset.candidateName = candidate.name

    // And finally we setup the callbacks to show the tooltip
    // In this example we only log on the console when the pointer
    // enters and leaves an SVG Path, but if it was actually implemented we'd:
    // - move an element to the center of the SVG Path
    // - update its label with the element data-candidate-name
    // - show the tooltip

    areaElem.addEventListener("mouseover", showTooltip)
    areaElem.addEventListener("mouseout", hideTooltip)
  }
}

main()
