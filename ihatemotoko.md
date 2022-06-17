### Some Useful Commands/Snippets Because I Really Hate Motoko

_Deposit to canister (local)_

    dfx canister --wallet $(dfx identity get-wallet)  deposit-cycles 10000000000 DeSu

_Compile locally to check syntax/etc_

    (dfx cache show)/moc Shopping.mo --package base $(dfx cache show)/base

_List canister ids deployed_

    cat .dfx/local/canister_ids.json