const headElem = document.getElementById('head');
const buttonsElem = document.getElementById('buttons');
const pagesElem = document.getElementById('pages');

class Quiz {
	constructor(questions, results) {
		this.questions = questions;
		this.results = results;
		this.score = 0;
		this.result = 0;
		this.current = 0;
	}

	click(index) {
		let value = this.questions[this.current].click(index);
		this.score += value;

		let correct = -1;
		if(value >= 1) {
			correct = index;
		}
		else {
			for(let i = 0; i < this.questions[this.current].answers.length; i++) {
				if(this.questions[this.current].answers[i].value >= 1) {
					correct = i;
					break;
				}
			}
		}

		this.next();

		return correct;
	}

	next() {
		this.current++;
		
		if(this.current >= this.questions.length) {
			this.end();
		}
	}

	end() {
		for(let i = 0; i < this.results.length; i++) {
			if(this.results[i].check(this.score)) {
				this.result = i;
			}
		}
	}
} 

class Question {
	constructor(text, answers) {
		this.text = text; 
		this.answers = answers; 
	}

	click(index) {
		return this.answers[index].value; 
	}
}

class Answer {
	constructor(text, value) {
		this.text = text; 
		this.value = value; 
	}
}

class Result {
	constructor(text, value, src) {
		this.text = text;
		this.value = value;
		this.src = src;
	}

	check(value) {
		if(this.value <= value) {
			return true;
		}
		else {
			return false;
		}
	}
}

const results = [
	new Result("Не грусти)", 0, 'https://klike.net/uploads/posts/2020-04/1585988826_9.jpg'),
	new Result("Уже лучше, молодец)))", 2, 'https://vjoy.cc/wp-content/uploads/2020/08/img_user_file_5a1a519048e29_0_22.jpg'),
	new Result("Держи немного соку)))", 4, 'https://www.coca-cola.ru/content/dam/one/ru/ru/2020/06/dobryiy/1_Dobry_Sok_Apple_1L.png'),
	new Result("Иди возьми шоколадку)))", 6, 'https://www.posadfm.ru/upload/iblock/764/764331422c8db8ad4a85f3317d7c0143.jpg'),
  	new Result("Иди возьми пирожок с творогом на столе)))", 8, 'https://mokostav.com/media/bakery/%D0%BF%D0%B8%D1%80%D0%BE%D0%B6%D0%BE%D0%BA%20%D1%81%20%D0%BA%D0%B0%D0%BF%D1%83%D1%81%D1%82%D0%BE%D0%B9.png'),
  	new Result("Я позвоню твоей маме и скажу, что ты умничка))))", 10, 'https://klike.net/uploads/posts/2020-08/1597215711_2.jpg')
];



fetch('/easy').then(jk => jk.json()).then(items => {
	const questions = []
	items.forEach(quest => {
		const ans = []
		quest.answers = quest.answers.sort(() => 0.5 - Math.random());
		quest.answers.forEach(item => {
			ans.push(new Answer(item.text, item.value))
		})
		questions.push(new Question(quest.text, ans));
	})
	const quiz = new Quiz(questions.sort(() => 0.5 - Math.random()), results);

	update(quiz);
})

function update(quiz) {
	if(quiz.current < quiz.questions.length) {
		headElem.textContent = quiz.questions[quiz.current].text;

		buttonsElem.innerHTML = '';

		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
			buttonsElem.insertAdjacentHTML('beforeend', `<li><button class='button' index='${i}'>${quiz.questions[quiz.current].answers[i].text}</button></li>`)
		}
		
		pagesElem.textContent = (quiz.current + 1) + ' / ' + quiz.questions.length;

		init(quiz);
	}
	else {
		buttonsElem.innerHTML = '';
		headElem.textContent = quiz.results[quiz.result].text;
		pagesElem.textContent = 'Очки: ' + quiz.score;
		headElem.insertAdjacentHTML('beforebegin', `<img src='${quiz.results[quiz.result].src}' width='400' height='250'>`)

	}
}

function init(quiz) {
	let btns = document.getElementsByClassName("button");

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (e) {
            Click(e.target.getAttribute("index"), quiz);
        });
    }
}

function Click(index, quiz) {
    let correct = quiz.click(index);

    let btns = document.getElementsByClassName("button");

    // Делаем кнопки серыми
    for (let i = 0; i < btns.length; i++) {
        btns[i].className = "button button_passive";
    }


    if (correct >= 0) {
        btns[correct].className = "button button_correct";
    }

    if (index != correct) {
        btns[index].className = "button button_wrong";
    }

    setTimeout(() => {
	    update(quiz)
    }, 1000);
}
