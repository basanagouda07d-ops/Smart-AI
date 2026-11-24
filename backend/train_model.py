import os
import json
import time
import random
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models, callbacks
from sklearn.model_selection import train_test_split

print("=" * 65)
print("  AgriAI Onion Disease Custom Deep CNN Training Pipeline")
print("  Architecture: 7-Layer Deep Convolutional Neural Network (CNN)")
print("=" * 65)

# Set random seeds for reproducibility
np.random.seed(42)
tf.random.set_seed(42)
random.seed(42)

# Dataset paths
BASE_DIR = r"D:\spidermann\SmartAI\dataset"
CATEGORY_DIRS = {
    "healthy": os.path.join(BASE_DIR, "augment", "augment", "healthy_augment"),
    "iris_yellow_virus": os.path.join(BASE_DIR, "augment", "augment", "Iris yellow virus_augment"),
    "purple_blotch": os.path.join(BASE_DIR, "augment", "purple blotch_augment"),
    "stemphylium_blight": os.path.join(BASE_DIR, "augment", "Stemphylium leaf blight and collectrichum leaf blight augment")
}

CLASS_NAMES = sorted(list(CATEGORY_DIRS.keys()))
CLASS_TO_IDX = {name: idx for idx, name in enumerate(CLASS_NAMES)}

print(f"\nDetected {len(CLASS_NAMES)} Onion Disease Classes:")
for idx, c in enumerate(CLASS_NAMES):
    print(f"  [{idx}] {c}: {CATEGORY_DIRS[c]}")

# Collect all image file paths and labels
file_paths = []
labels = []

for class_name, folder_path in CATEGORY_DIRS.items():
    if not os.path.exists(folder_path):
        print(f"Warning: Directory not found: {folder_path}")
        continue
    images = [
        os.path.join(folder_path, f)
        for f in os.listdir(folder_path)
        if f.lower().endswith(('.jpg', '.jpeg', '.png'))
    ]
    file_paths.extend(images)
    labels.extend([CLASS_TO_IDX[class_name]] * len(images))
    print(f"  -> {class_name}: {len(images)} images")

total_images = len(file_paths)
print(f"\nTotal Dataset Images Collected: {total_images}")

if total_images == 0:
    raise ValueError("No images found in dataset directories!")

# Stratified Train/Val Split (80% Train, 20% Validation)
train_files, val_files, train_labels, val_labels = train_test_split(
    file_paths, labels, test_size=0.20, random_state=42, stratify=labels
)

print(f"Training Samples:   {len(train_files)} (80%)")
print(f"Validation Samples: {len(val_files)} (20%)")

IMG_SIZE = (128, 128)
BATCH_SIZE = 64

def process_path(file_path, label):
    img = tf.io.read_file(file_path)
    img = tf.io.decode_image(img, channels=3, expand_animations=False)
    img = tf.image.resize(img, IMG_SIZE)
    img.set_shape([IMG_SIZE[0], IMG_SIZE[1], 3])
    img = tf.cast(img, tf.float32) / 255.0
    return img, label

def create_dataset(paths, lbls, is_training=True):
    ds = tf.data.Dataset.from_tensor_slices((paths, lbls))
    if is_training:
        ds = ds.shuffle(buffer_size=1024, seed=42)
    ds = ds.map(process_path, num_parallel_calls=tf.data.AUTOTUNE)
    ds = ds.batch(BATCH_SIZE)
    ds = ds.prefetch(buffer_size=tf.data.AUTOTUNE)
    return ds

train_ds = create_dataset(train_files, train_labels, is_training=True)
val_ds = create_dataset(val_files, val_labels, is_training=False)

print("\nConstructing Custom Deep Convolutional Neural Network (CNN)...")
inputs = layers.Input(shape=(IMG_SIZE[0], IMG_SIZE[1], 3), name="input_image")

# Data Augmentation (Prevents overfitting on augmented foliage)
x = layers.RandomFlip("horizontal_and_vertical")(inputs)
x = layers.RandomRotation(0.12)(x)
x = layers.RandomZoom(0.08)(x)
x = layers.RandomContrast(0.08)(x)

# Conv Block 1 (Foliar edges & low-level color boundaries)
x = layers.Conv2D(32, (3, 3), padding='same', activation='relu', kernel_initializer='he_normal')(x)
x = layers.BatchNormalization()(x)
x = layers.Conv2D(32, (3, 3), activation='relu', kernel_initializer='he_normal')(x)
x = layers.BatchNormalization()(x)
x = layers.MaxPooling2D(pool_size=(2, 2))(x)
x = layers.Dropout(0.2)(x)

# Conv Block 2 (Chlorophyll veins & texture patterns)
x = layers.Conv2D(64, (3, 3), padding='same', activation='relu', kernel_initializer='he_normal')(x)
x = layers.BatchNormalization()(x)
x = layers.Conv2D(64, (3, 3), activation='relu', kernel_initializer='he_normal')(x)
x = layers.BatchNormalization()(x)
x = layers.MaxPooling2D(pool_size=(2, 2))(x)
x = layers.Dropout(0.25)(x)

# Conv Block 3 (Necrotic lesion boundaries & halo rings)
x = layers.Conv2D(128, (3, 3), padding='same', activation='relu', kernel_initializer='he_normal')(x)
x = layers.BatchNormalization()(x)
x = layers.Conv2D(128, (3, 3), activation='relu', kernel_initializer='he_normal')(x)
x = layers.BatchNormalization()(x)
x = layers.MaxPooling2D(pool_size=(2, 2))(x)
x = layers.Dropout(0.3)(x)

# Conv Block 4 (High-level pathogen morphology & spore cluster features)
x = layers.Conv2D(256, (3, 3), padding='same', activation='relu', kernel_initializer='he_normal')(x)
x = layers.BatchNormalization()(x)
x = layers.MaxPooling2D(pool_size=(2, 2))(x)
x = layers.Dropout(0.35)(x)

# Classifier Head
x = layers.Flatten()(x)
x = layers.Dense(256, activation='relu', kernel_initializer='he_normal')(x)
x = layers.BatchNormalization()(x)
x = layers.Dropout(0.5)(x)
x = layers.Dense(128, activation='relu', kernel_initializer='he_normal')(x)
x = layers.Dropout(0.3)(x)
outputs = layers.Dense(len(CLASS_NAMES), activation='softmax', name='disease_predictions')(x)

model = models.Model(inputs=inputs, outputs=outputs, name="AgriAI_Custom_CNN_Onion")

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.0005),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

model.summary()

# Output directories
MODELS_DIR = r"D:\spidermann\SmartAI\backend\models"
os.makedirs(MODELS_DIR, exist_ok=True)

MODEL_PATH = os.path.join(MODELS_DIR, "onion_disease_model.keras")

# Training callbacks
early_stop = callbacks.EarlyStopping(
    monitor='val_accuracy', patience=4, restore_best_weights=True, verbose=1
)
checkpoint = callbacks.ModelCheckpoint(
    MODEL_PATH, monitor='val_accuracy', save_best_only=True, verbose=1
)
reduce_lr = callbacks.ReduceLROnPlateau(
    monitor='val_accuracy', factor=0.5, patience=2, verbose=1, min_lr=1e-6
)

print("\nStarting CNN Deep Learning Training...")
start_time = time.time()

EPOCHS = 8
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS,
    callbacks=[early_stop, checkpoint, reduce_lr]
)

total_duration = time.time() - start_time
print(f"\nCNN Training completed in {total_duration:.1f} seconds!")

# Final Evaluation
val_loss, val_acc = model.evaluate(val_ds, verbose=0)
print(f"Final Validation Accuracy: {val_acc * 100:.2f}%")
print(f"Final Validation Loss:     {val_loss:.4f}")

# Save class index mapping
class_info = {
    "architecture": "Custom Deep CNN (7 Conv2D Layers + BatchNorm + Dropout + Dense Softmax)",
    "classes": CLASS_NAMES,
    "class_to_idx": CLASS_TO_IDX,
    "img_size": list(IMG_SIZE),
    "val_accuracy": round(val_acc * 100, 2),
    "val_loss": round(val_loss, 4),
    "total_images": total_images,
    "trained_at": time.strftime("%Y-%m-%d %H:%M:%S")
}

with open(os.path.join(MODELS_DIR, "class_indices.json"), "w") as f:
    json.dump(class_info, f, indent=2)

# Save training history
history_dict = {
    "accuracy": [round(float(x), 4) for x in history.history['accuracy']],
    "val_accuracy": [round(float(x), 4) for x in history.history['val_accuracy']],
    "loss": [round(float(x), 4) for x in history.history['loss']],
    "val_loss": [round(float(x), 4) for x in history.history['val_loss']],
    "training_time_sec": round(total_duration, 1)
}

with open(os.path.join(MODELS_DIR, "training_history.json"), "w") as f:
    json.dump(history_dict, f, indent=2)

print("\n[SUCCESS] CNN Model and artifacts successfully saved to:")
print(f"  Model:   {MODEL_PATH}")
print(f"  Classes: {os.path.join(MODELS_DIR, 'class_indices.json')}")
print(f"  History: {os.path.join(MODELS_DIR, 'training_history.json')}")
