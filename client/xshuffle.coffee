@parseItem = (i, listOutput) ->
	if typeof i is 'object'
		iLast = i[i.length - 1]
		if typeof iLast is 'string'
			if iLast == "m"
				listOutput = multiplyItem(i, listOutput)
			else if iLast == "c"
				listOutput = chooseItem(i, "group", listOutput)
			else if iLast == "ci"
				listOutput = chooseItem(i, "indiv", listOutput)
		else
			listOutput = extendItem(i, listOutput)
	else if typeof i is 'number'
		listOutput = addItem(i, listOutput)
	return listOutput
	
multiplyItem = (tuply, listOutput) ->
	if tuply.length != 3
		return
	item = tuply[0]
	count = tuply[1]
	for x in [1..count]
		listOutput = parseItem(item, listOutput)
	return listOutput
	
chooseItem = (tuply, typy, listOutput) ->
	if tuply.length != 3
		return
	listy = tuply[0]
	count = tuply[1]
	if typy == "group"
		shuffle(listy)
		listy.length = count
		for i in listy
			listOutput = parseItem(i, listOutput)
	else if typy == "indiv"
		tempList = []
		for i in listy
			tempList = parseItem(i, tempList)
		shuffle(tempList)
		tempList.length = count
		listOutput = listOutput.concat(tempList);
	return listOutput

extendItem = (listy, listOutput) ->
	for i in listy
		listOutput = parseItem(i, listOutput)
	return listOutput

addItem = (i, listOutput) ->
	listOutput.push(i)
	return listOutput
	
shuffle = (a) ->
	i = a.length
	while --i > 0
		j = ~~(Math.random() * (i + 1)) # ~~ is a common optimization for Math.floor
		t = a[j]
		a[j] = a[i]
		a[i] = t
	a

#listOutput = parseItem(listInput, [])
