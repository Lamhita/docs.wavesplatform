# What is a dApp

Before getting acquainted with [dApp](/en/blockchain/account/dapp), let's review the features of related entities — [account](/en/blockchain/account) and [smart account](/en/blockchain/account/smart-account).

An account provides the functionality to verify that an issued [transaction](/en/blockchain/transaction) was indeed sent from this account.

Smart account, i.e. an account with an [account script](/en/ride/script/script-types/account-script) attached, provides the functionality to check outgoing transactions for compliance with the conditions specified in the script. For example, an account owner can set a rule according to which transactions can be sent from an [address](/en/blockchain/account/address) only if the blockchain height exceeds N. Another example —  you can allow transactions only of a certain type. Or cancel any check by establishing a rule according to which all transactions sent from the address should be considered valid.

The features of a dApp are even wider. Besides validating the outgoing transactions it also allows other accounts to invoke the functions contained in it. From this point of view, dApp is a real blockchain application.

## General Requirements to Write dApp

dApps are written in [Ride](/en/ride). To create dApp, you need an account that has enough [WAVES](/en/blockchain/token/waves) on its balance to pay for the set script transaction (1 WAVES). To start writing dApp right away, use the [Waves IDE](/en/building-apps/smart-contracts/tools/waves-ide).

## dApp Structure

### Directive

Each Ride script must begin with a directive. Review the directive example:

```ride
{-# STDLIB_VERSION 3 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}
```

The directive listed above tells the compiler that

- the script will use the third version of the library of standard functions
- the type of this script is dApp
- the script will be attached to the account (and not to the asset).

### Script Context

The directive is followed by a script context. The context of the script is where the functions that will be available within the entire dApp are defined and the variables are declared.  In addition to the variables and functions declared by the developer, the script context includes [built-in variables](/en/ride/variables/built-in-variables) and [built-in functions](/en/ride/functions/built-in-functions). The developer doesn't have to declare their variables or define their functions — this will not affect the presence of built-in variables and functions.

### Declaring Callable Functions

As it was mentioned before, dApps provide the functionality to call functions to other accounts. These functions are marked with the `@Callable(invocation)` [annotation](/en/ride/functions/annotations), where `invocation` is an arbitrary script context object.

The following is an example of a callable function, which assigns `42` to `someDataKey` and writes it to the [account data storage](/en/blockchain/account/account-data-storage) if the account owner calls it. If someone else tries to do this, the function throws an exception. The transaction, in this case, will not be valid and will not be recorded into the blockchain:

```ride
@Callable(invocation)
func foo() = {
   if (invocation.caller == this)
   then
       ScriptResult(
            WriteSet([DataEntry("someDataKey", 42)]),
            TransferSet([ScriptTransfer(invocation.caller, 100500, unit)])
        )
   else
       throw("Only owner can use this function.")
}
```

### Declaring Validation Function

The validation function does the same as a smart account, i.e. validates outgoing transactions. This function is marked with the `@Verifier(tx)` annotation, where `tx` is the current transaction that the function is currently checking. Possible results of the validation function execution are:

- `true` (transaction is allowed)
- `false` (transaction is not allowed)
- error

If dApp does not have the validation function, then the default validation is performed (that is, checking that the transaction is indeed signed by this account).

dApp with the validation function listed below will only allow [transfer transactions](/en/blockchain/transaction-type/transfer-transaction) (sending transactions of other types will be prohibited):

```ride
@Verifier(tx)
func verify() = {
    match tx {
        case ttx:TransferTransaction => sigVerify(ttx.bodyBytes, ttx.proofs[0], ttx.senderPublicKey)
        case _ => false
    }
}
```

## dApp limitations

Limitations on the size, complexity of the script, as well as on functions and variables are given in the [Limitations](/en/ride/limits) article.

An additional 0.004 WAVES is charged for each transaction sent with dApp. The minimum fee for most transactions is 0.001 WAVES. Thus, the cost of sending each of these transactions will be 0.005 WAVES for the owner of dApp.

## dApp Example

dApp in the example below allows us to deposit WAVES and withdraw them back while withdrawing WAVES that belong to another account is not possible.

```ride
# Directives
{-# STDLIB_VERSION 3 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

# Script context block
# (Empty)

# Callable function. Implements funds deposit
@Callable(i)	# Context object named i
func deposit() = {
   let pmt = extract(i.payment)
   if (isDefined(pmt.assetId)) then throw("can hold waves only at the moment")
   else {
        let currentKey = toBase58String(i.caller.bytes)
        let currentAmount = match getInteger(this, currentKey) {
            case a:Int => a
            case _ => 0
        }
        let newAmount = currentAmount + pmt.amount
        WriteSet([DataEntry(currentKey, newAmount)])
   }
}

# Callable function. Implements funds withdraw 
@Callable(i)	# Объект контекста с именем i
func withdraw(amount: Int) = {
        let currentKey = toBase58String(i.caller.bytes)
        let currentAmount = match getInteger(this, currentKey) {
            case a:Int => a
            case _ => 0
        }
        let newAmount = currentAmount - amount
     if (amount < 0)
            then throw("Can't withdraw negative amount")
    else if (newAmount < 0)
            then throw("Not enough balance")
            else ScriptResult(
                    WriteSet([DataEntry(currentKey, newAmount)]),
                    TransferSet([ScriptTransfer(i.caller, amount, unit)])
                )
    }

# Outgoing transactions validation function. Is similar to basic function of verification of the ownership of the transaction to the account holder

@Verifier(tx)
func verify() = {
    sigVerify(tx.bodyBytes, tx.proofs[0], tx.senderPublicKey)
}
```

## Attaching dApp script to Account

To attach dApp script to an account, use the [set script transaction](/en/blockchain/transaction-type/set-script-transaction).
