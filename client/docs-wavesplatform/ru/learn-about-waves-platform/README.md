# Транзакция данных

**Транзакция данных** — [транзакция](/blockchain/transaction.md), которая записывает данные в [хранилище данных аккаунта](/blockchain/account/account-data-storage.md).

У каждой транзакции данных есть **массив данных**, который содержит данные для записи. В [JSON-представлении транзакции](#json-representation) массив данных — поле `data`.

## Массив данных

Максимальная длина массива — 100 элементов.

Максимальный размер массива — 150 килобайт.

Каждый элемент массива представляет собой объект, у которого есть 3 поля — `key`, `type`, `value`.

Массив не может содержать элементы с одинаковым значением поля key.

### Поле `key`

Поле `key` — непустая строка в кодировке [UTF-8](https://ru.wikipedia.org/wiki/UTF-8).

На этапе [валидации транзакции](/blockchain/transaction/transaction-validation.md) поле `key` конвертируется из кодировки UTF-8 в [UTF-16](https://ru.wikipedia.org/wiki/UTF-16). Размер получившегося массива 16-битных слов не должен превышать 100 элементов. Таким образом, размер ключа должен быть от 1 до 200 байтов включительно.

### Поле `type`

Значение поля `type` — короткое целое, определяющее тип значения, хранимого в поле `value`:

- 0 — целое число
- 1 — логическое значение
- 2 — массив байтов
- 3 — строка

### Поле `value`

Поле `value` может хранить целое число, логическое значение, массив байтов или строку.

Размер данных поля может составлять от 0 до 32767 байт.

## Бинарный формат

Смотрите страницу [Бинарный формат транзакции данных](/blockchain/binary-format/transaction-binary-format/data-transaction-binary-format.md).