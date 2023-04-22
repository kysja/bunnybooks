<?php 

$catTypes = ['Income', 'Expense', 'COGS'];
$pdo = new PDO('mysql:host=localhost;dbname=bunnybooks', 'root', 'mysql', [
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
]);

if ($_REQUEST['action'] ?? false) {

    $func = $_REQUEST['action'];

    if (function_exists($func)) echo json_encode($func());
}


function getCategories() {
    global $pdo;
    $categories = $pdo->query('SELECT * FROM categories')->fetchAll();
    return $categories;
}


function getCatTypes() {
    global $catTypes;
    return $catTypes;
}


function addCategory() {
    global $pdo;

    $data = json_decode(file_get_contents('php://input'));

    $stmt = $pdo->prepare('INSERT INTO categories (type, name, description) VALUES (:type, :name, :description)');
    $stmt->execute([
        'type' => $data->type,
        'name' => $data->name,
        'description' => $data->description
    ]);

    return ['id' => $pdo->lastInsertId(), 'type' => $data->type, 'name' => $data->name, 'description' => $data->description];
}


function updateCategory() {
    global $pdo;

    $data = json_decode(file_get_contents('php://input'));

    $stmt = $pdo->prepare('UPDATE categories SET type = :type, name = :name, description = :description WHERE id = :id');
    $stmt->execute([
        'type' => $data->type,
        'name' => $data->name,
        'description' => $data->description,
        'id' => $data->id
    ]);

    return ['id' => $data->id, 'type' => $data->type, 'name' => $data->name, 'description' => $data->description];
}


function deleteCategory() {
    global $pdo;

    $data = json_decode(file_get_contents('php://input'));

    $stmt = $pdo->prepare('DELETE FROM categories WHERE id = :id');
    $stmt->execute(['id' => $data->id]);

    return ['id' => $data->id];
}


function getTransactions() {
    global $pdo;
    $transactions = $pdo->query('SELECT * FROM transactions ORDER BY dt DESC, id DESC')->fetchAll();
    foreach ($transactions as &$transaction) $transaction['amount'] = $transaction['amount'] / 100;
    return $transactions;
}




function addTransaction() {
    global $pdo;

    $data = json_decode(file_get_contents('php://input'));

    $stmt = $pdo->prepare('INSERT INTO transactions (category_id, dt, name, description, amount) VALUES (:category_id, :dt, :name, :description, :amount)');
    $stmt->execute([
        'category_id' => $data->category_id,
        'dt' => $data->dt,
        'name' => $data->name,
        'description' => $data->description,
        'amount' => (int) ((float) $data->amount * 100)
    ]);

    return ['id' => $pdo->lastInsertId(), 'category_id' => $data->category_id, 'dt' => $data->dt, 'name' => $data->name, 'description' => $data->description, 'amount' => (float) $data->amount];
}


function updateTransaction() {
    global $pdo;

    $data = json_decode(file_get_contents('php://input'));

    $stmt = $pdo->prepare('UPDATE transactions SET category_id = :category_id, dt = :dt, name = :name, description = :description, amount = :amount WHERE id = :id');
    $stmt->execute([
        'category_id' => $data->category_id,
        'dt' => $data->dt,
        'name' => $data->name,
        'description' => $data->description,
        'amount' => (float) $data->amount*100,
        'id' => $data->id
    ]);

    return ['id' => $data->id, 'category_id' => $data->category_id, 'dt' => $data->dt, 'name' => $data->name, 'description' => $data->description, 'amount' => (float) $data->amount];
}


function deleteTransaction() {
    global $pdo;

    $data = json_decode(file_get_contents('php://input'));

    $stmt = $pdo->prepare('DELETE FROM transactions WHERE id = :id');
    $stmt->execute(['id' => $data->id]);

    return ['id' => $data->id];
}