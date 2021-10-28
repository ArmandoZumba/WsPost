﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WSPost.Dominio
{
    public class PostModel
    {
        public int Id { get; set; }
        public string Link { get; set; }
	    public string Name { get; set; }
	    public string Content { get; set; }
	    public string Date { get; set; }
        public string Description { get; set; }
    }
}
