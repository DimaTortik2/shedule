const { Bot, Keyboard } = require('grammy')

const bot = new Bot('8044462387:AAF_CYdUpEL6mVazbiwuCaC1ibkDPqAwR1I')

const SHEDULE_ARRAY1_3 = [
	'Отдыхаем :]',
	'1. \n2. Англ\n3. ОАИП          Понедельник    \n4. РиСБД',
	'1. КПиЯП\n2. КПиЯП\n3. ИТ                Вторник\n    Физра\n4. Матем',
	'1. КПиЯП\n2. КПиЯП         Среда\n3. ОАИП',
	'1. АЛОВТ\n2. АЛОВТ\n3. ОАИП           Четверг\n    Физра\n4. Матем',
	'1. АЛОВТ\n2. КГиВД          Пятница\n3. ИТ',
	'1. РиСБД\n2. РиСБД         Суббота\n    Физра\n3. ИГ',
]

const SHEDULE_ARRAY2_4 = [
	'Отдыхаем :]',
	'1. \n2. Англ\n3. ОАИП          Понедельник    \n4. РиСБД',
	'1. КПиЯП\n2. КПиЯП\n3. ИТ                Вторник\n    Физра\n4. Матем',
	'1. КПиЯП\n2. КГиВД          Среда\n3. ОАИП\n4. ИТ',
	'1. АЛОВТ\n2. АЛОВТ\n3. ОАИП           Четверг\n    Физра\n4. Матем',
	'1. АЛОВТ\n2. ИТ                 Пятница\n3. ИТ',
	'1. РиСБД\n2. РиСБД          Суббота\n    Физра\n3. ИГ',
]

// let day = 2
// let month = 3

// const currentDate = new Date(new Date().getFullYear(), month - 1, day)

// console.log(currentDate.toLocaleString())

const isChetnae = () => {
	const currentDate = new Date()

	const startOfYear = new Date(currentDate.getFullYear(), 0, 1)
	const daysPassed = Math.floor(
		(currentDate - startOfYear) / (1000 * 60 * 60 * 24)
	)
	return Math.ceil((daysPassed + startOfYear.getDay() + 1) / 7) % 2 == 0
}

const getNedel = ctx => {
	const currentDate = new Date()

	let shedule = ''

	let dayName = currentDate.getDay()

	let isSunday = dayName == 0

	let isChet = isSunday ? !isChetnae() : isChetnae()

	if (isChet) {
		for (let i = 1; i <= 6; i++) {
			shedule += SHEDULE_ARRAY2_4[i] + '\n\n'
		}
	} else {
		for (let i = 1; i <= 6; i++) {
			shedule += SHEDULE_ARRAY1_3[i] + '\n\n'
		}
	}

	ctx.reply(
		`дата ${currentDate.toLocaleString()}, было ${
			isChetnae() ? 'четноеее' : 'нечетное'
		}`
		//  + `стало ${isChet ? 'четное' : 'нечетное'}`
	)

	ctx.reply(shedule)
	if (isSunday) {
		ctx.reply(
			'Так как сегодня воскресенье, я прислал расписание на следующую неделю, гы)'
		)
	}
}

const getSegodn = ctx => {
	const currentDate = new Date()

	let idx = currentDate.getDay()

	ctx.reply(idx)

	ctx.reply(isChetnae() ? SHEDULE_ARRAY2_4[idx] : SHEDULE_ARRAY1_3[idx])
}

const getZavtra = ctx => {
	const currentDate = new Date()

	let isChet = isChetnae()

	let idx = currentDate.getDay() + 1

	if (idx == 7) {
		idx = 1
		isChet = !isChet
	}

	let shedSeg = 'a'

	if (isChet) {
		shedSeg = SHEDULE_ARRAY2_4[idx]
	} else {
		shedSeg = SHEDULE_ARRAY1_3[idx]
	}

	ctx.reply(shedSeg)
}

bot.command('start', ctx => {
	ctx.reply('Привет! Выбери команду:', {
		reply_markup: new Keyboard()
			.text('Сегодня')
			.text('Завтра')
			.row()
			.text('На неделю')
			.resized(),
	})
})

bot.hears('Клава', ctx => {
	ctx.reply('Привет! Выбери команду:', {
		reply_markup: new Keyboard()
			.text('Сегодня')
			.text('Завтра')
			.row()
			.text('На неделю')
			.resized(),
	})
})

bot.hears('Сегодня', getSegodn)
bot.hears('Завтра', getZavtra)
bot.hears('На неделю', getNedel)

bot.start().catch(console.error)
