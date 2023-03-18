CREATE TABLE IF NOT EXISTS "Todo" (
    "id"  SERIAL , 
    "title" VARCHAR(255), 
    "isCompleted" BOOLEAN, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("id")
);

INSERT INTO public."Todo" 
    ("title", "isCompleted", "createdAt", "updatedAt")
    VALUES('Task 1', false, Now(), null);