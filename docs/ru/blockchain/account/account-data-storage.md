# Хранилище данных аккаунта

**Хранилище данных аккаунта** — ассоциированное с [аккаунтом](/ru/blockchain/account) хранилище записей данных.

У каждого аккаунта есть _единственное_ хранилище данных.

Размер хранилища данных аккаунта неограничен.

## Запись хранилища данных аккаунта

**Запись хранилища данных аккаунта** — запись данных, которая имеет формат ключ-значение.

Ключ — уникальная строка.

Значение — данные одного из типов:

* строковый
* логический
* целочисленный
* массив байтов

## Добавление записей

Записи добавляются в хранилище данных аккаунта с помощью [транзакции данных](/ru/blockchain/transaction-type/data-transaction) или [транзакции вызова скрипта](/ru/blockchain/transaction-type/invoke-script-transaction).

Максимальный размер одной записи — [32 килобайта](https://github.com/wavesplatform/Waves/blob/79442553314012cc0e2c1defca9d85f8a84e1770/lang/shared/src/main/scala/com/wavesplatform/lang/v1/ContractLimits.scala#L11) для транзакции данных и [5 килобайтов](https://github.com/wavesplatform/Waves/blob/79442553314012cc0e2c1defca9d85f8a84e1770/lang/shared/src/main/scala/com/wavesplatform/lang/v1/ContractLimits.scala#L20) для транзакции вызова скрипта.

## Редактирование записей

Значение записи можно перезаписать с помощью транзакции данных или транзакции вызова скрипта.

Ключ записи перезаписать нельзя.

## Удаление записей

> С версии ноды 1.2.0 возможно удаление записей хранилища данных аккаунта. Возможность включается с активацией на ноде функциональности "Ride V4 and multiple attached payments for Invoke Script Transaction" (№16).
На данный момент версии 1.2.x доступны на [stagenet](/ru/blockchain/blockchain-network/stage-network)

Удаление записей хранилища данных аккаунта выполняется при помощи

- [транзакции данных](/ru/blockchain/transaction-type/data-transaction),
- структуры [DeleteKey](/ru/ride/structures/common-structures/delete-key).

Удаление записи выполняется по ключу.
