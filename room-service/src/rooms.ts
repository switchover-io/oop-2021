const rooms = [
  {
        "id": "00d88066-f2b9-4f8c-803d-d08b8c7eb6bb",
        "title": "amet eros suspendisse accumsan",
        "subheading": "posuere cubilia curae",
        "image" : 'https://images.unsplash.com/photo-1590074072786-a66914d668f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60%20600w',
        "description": "ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum",
        "city": "Hamburg",
        "plus" : true,
        "pricePerDay": 155
      }, {
        "id": "05a7bc10-a00d-4b6e-8177-87323bb473d2",
        "title": "ac lobortis vel dapibus at",
        "subheading": "nunc nisl",
        "image" : "https://images.unsplash.com/photo-1568495248636-6432b97bd949?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60%20600w",
        "description": "at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit",
        "city": "Hamburg",
        "pricePerDay": 69
      }, {
        "id": "895d07db-a9d5-471c-9bbc-1d5abcd22918",
        "title": "ligula suspendisse",
        "subheading": "adipiscing lorem vitae",
        "image" : "https://images.unsplash.com/photo-1576675784201-0e142b423952?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60%20600w",
        "description": "magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus",
        "city": "Frankfurt",
        "pricePerDay": 81
      }, {
        "id": "27dcf350-7432-4d80-8920-455a94c6ec72",
        "title": "eu tincidunt in",
        "subheading": "luctus nec",
        "image" : "https://images.unsplash.com/photo-1576675784201-0e142b423952?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60%20600w",
        "description": "eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus",
        "city": "Ingolstadt",
        "pricePerDay": 61
      }, {
        "id": "a8dd4ba7-236e-40f7-b41e-d71c2bdb4769",
        "title": "vestibulum sit amet",
        "subheading": "nulla ac enim",
        "image": 'https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60 600w',
        "description": "tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros",
        "city": "Frankfurt",
        "pricePerDay": 115,
        "plus" : true
      }, {
        "id": "b1b2be55-a3b6-437a-bec6-8bc4052b4c93",
        "title": "habitasse platea",
        "subheading": "magna vulputate luctus",
        "image" : "https://images.unsplash.com/photo-1576675784201-0e142b423952?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60%20600w",
        "description": "viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci",
        "city": "Ingolstadt",
        "pricePerDay": 39
      }, {
        "id": "f8c8cd1c-9de3-4cf0-8901-561c24261a7c",
        "title": "molestie sed justo pellentesque",
        "subheading": "erat quisque erat",
        "image" : "https://images.unsplash.com/photo-1576675784201-0e142b423952?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60%20600w",
        "description": "rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia",
        "city": "Berlin",
        "pricePerDay": 104
      }, {
        "id": "76c590cb-52ac-4768-9e6a-55c585266d1f",
        "title": "justo pellentesque",
        "subheading": "tincidunt lacus at",
        "image" : "https://images.unsplash.com/photo-1576675784201-0e142b423952?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60%20600w",
        "description": "aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla",
        "city": "Ingolstadt",
        "pricePerDay": 56
      }, {
        "id": "fd51d757-9936-4f13-9733-d9a57abc5620",
        "title": "rutrum nulla tellus in",
        "subheading": "luctus et",
        "image" : "https://images.unsplash.com/photo-1576675784201-0e142b423952?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60%20600w",
        "description": "pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum",
        "city": "München",
        "pricePerDay": 32
      }, {
        "id": "ac4d186e-1ae0-440e-a4d6-461da7c812ff",
        "title": "sapien a",
        "subheading": "curabitur convallis",
        "image" : "https://images.unsplash.com/photo-1576675784201-0e142b423952?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60%20600w",
        "description": "duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea",
        "city": "Ingolstadt",
        "plus" : true,
        "pricePerDay": 163
      }
]

export default rooms;