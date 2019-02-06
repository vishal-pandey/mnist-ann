#!/usr/bin/env python
# coding: utf-8

# In[4]:


import numpy as np
import matplotlib.pyplot as plt
# get_ipython().run_line_magic('matplotlib', 'inline')
import tensorflow as tf
learn = tf.contrib.learn
tf.logging.set_verbosity(tf.logging.ERROR)


# In[5]:


mnist = learn.datasets.load_dataset('mnist')
data = mnist.train.images
labels = np.asarray(mnist.train.labels, dtype=np.int32)
test_data = mnist.test.images
test_labels = np.asarray(mnist.test.labels, dtype=np.int32)


# In[6]:


max_examples = 2000
data = data[:max_examples]
labels = labels[:max_examples]

test_data = test_data[:1000]
test_labels = test_labels[:1000]

print(len(test_data))


# In[106]:


for i in range(0,len(data)):
    for j in range(0, len(data[i])):
        if data[i][j] >= 0.5:
            data[i][j] = 1
        else:
            data[i][j] = 0


# In[7]:


def display(i):
    img = data[i]
    plt.title('Example %d. Label: %d' % (i, labels[i]))
    plt.imshow(img.reshape((28,28)), cmap=plt.cm.gray_r)


# In[8]:


display(1999)


# In[9]:


def d_label(i):
    op = []
    for j in range(0,10):
        if j == labels[i]:
            op.append(1)
        else:
            op.append(0)
    return(op)

d_label(1999)


# In[10]:



# weights = np.random.random((784,1))
w_data = []
for j in range(0,10):
    np.random.seed(0)
    weights = np.random.random((784,1))
    w_data.append(weights)

# print(len(data[0]))


# In[11]:


print(w_data[0][0][0])


# In[ ]:


def actual_output(i):
    aop = []
    for j in range(0,10):
        d = np.dot(data[i], w_data[j])
        aop.append(d[0]/784)
    return aop

def update_cell_weight(i, error, k):
#     print(w_data[i][263])
#     print("\n\n")

    LEARNING_RATE = 0.05
    for j in range(0,784):
        w_data[i][j][0] += LEARNING_RATE * data[k][j] * error
#     print(w_data[i][263])

    
def train(i):

    a_op = actual_output(i)
    i_op = d_label(i)
    a_op = np.asarray(a_op)
    i_op = np.asarray(i_op)
    error = np.subtract(i_op,a_op)
    
#     print(a_op)
#     print(i_op)
#     print(error)
    
    for j in range(0,10):
        update_cell_weight(j, error[j], i)
    
#     update_cell_weight(labels[i])



# train(1)
for i in range(0,len(data)):
    train(i)
# print(np.dot(data[99], weights))


# In[219]:


print(actual_output(500))
display(500)


# In[220]:


def display_test(i):
    img = test_data[i]
    plt.title('Example %d. Label: %d' % (i, test_labels[i]))
    plt.imshow(img.reshape((28,28)), cmap=plt.cm.gray_r)


# In[2]:


def prediction_ratio():
    result = []
    for k in range(0,len(test_data)):
        aop = []
        for j in range(0,10):
            d = np.dot(test_data[k], w_data[j])
            aop.append(d[0]/784)
        if aop.index(max(aop)) == test_labels[k]:
            result.append(1)
        else:
            result.append(0)
    return result
#     return aop.index(aop.)

X = prediction_ratio()


# In[1]:


ones = 0
for i in range(0,1000):
    if X[i] == 1:
        ones+=1
print(ones/1000)


# print(w_data)


# In[227]:


f = open('weights.txt', 'w')
f.write(str(w_data))


# In[ ]:




